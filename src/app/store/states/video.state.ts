import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Video } from "@shared/models";
import { StorageService, YoutubeService } from "@shared/services";
import { EditVideoNote, FetchVideos, SortVideos } from "@store/actions";
import { tap } from "rxjs";

export class VideoStateModel {
    videos!: Video[];
    sortedIndexes!: string[];
    loading!: boolean;
    error!: boolean;
}

@Injectable()
@State<VideoStateModel>({
    name: 'videos',
    defaults: {
        videos: [],
        sortedIndexes: [],
        loading: false,
        error: false
    }
})

export class VideoState {
    constructor(
        private youtubeService: YoutubeService,
        private storageService: StorageService
    ) { }

    //#region selectors

    @Selector()
    static getVideos(state: VideoStateModel) {
        return state.videos;
    }

    @Selector()
    static isLoading(state: VideoStateModel) {
        return state.loading;
    }

    @Selector()
    static hasError(state: VideoStateModel) {
        return state.error;
    }

    //#endregion


    //#region actions
    @Action(FetchVideos)
    fetch(ctx: StateContext<VideoStateModel>, action: FetchVideos) {
        // Set loading to true and error to false at the start
        ctx.patchState({ loading: true, error: false });

        // Validate channelId
        if (!action.channelId) {
            ctx.patchState({ loading: false, error: true });
            return;
        }

        // Fetch videos from YoutubeService
        return this.youtubeService.getVideos(action.channelId).pipe(
            tap(
                (response: any) => {
                    let fetchedVideos: Video[] = response.items.map((item: any) => {
                        return {
                            title: item.snippet.title,
                            imageUrl: item.snippet.thumbnails.default.url,
                            id: item.id.videoId,
                            note: ''
                        }
                    });
                    ;
                    // Load notes from StorageService
                    fetchedVideos.forEach(video => {
                        const savedNote = this.storageService.get(`note_${video.id}`);
                        if (savedNote) {
                            video.note = savedNote;
                        }
                    });

                    // Sorting logic here if needed
                    const state = ctx.getState();
                    const sortedVideos = fetchedVideos.sort((a: Video, b: Video) => {
                        var aOrder = state.sortedIndexes.findIndex(id => id === a.id);
                        var bOrder = state.sortedIndexes.findIndex(id => id === b.id);

                        if (aOrder < bOrder) return -1;
                        if (aOrder > bOrder) return 1;

                        return fetchedVideos.indexOf(a) - fetchedVideos.indexOf(b);
                    });

                    // Update the state with the fetched and sorted videos
                    ctx.setState({
                        ...state,
                        videos: sortedVideos,
                        loading: false,
                        error: false
                    });
                },
                (error) => {
                    // If an error occurs, set loading to false and error to true
                    ctx.patchState({ loading: false, error: true });
                }
            )
        );
    }

    @Action(SortVideos)
    sort(ctx: StateContext<VideoStateModel>, action: SortVideos) {
        // Retrieve the current state
        const state = ctx.getState();

        // Sort the videos based on the provided sorted indexes
        const sortedVideos = [...state.videos].sort((a: Video, b: Video) => {
            const aOrder = action.payload.findIndex(id => id === a.id);
            const bOrder = action.payload.findIndex(id => id === b.id);

            // If 'id' values are equal, compare the 'sortedIndexes' property
            if (aOrder < bOrder) return -1;
            if (aOrder > bOrder) return 1;

            // If 'id' and 'sortedIndexes' values are equal, compare the original index in the array
            return state.videos.indexOf(a) - state.videos.indexOf(b);
        });

        // Update the state with the sorted videos and sortedIndexes
        ctx.setState({
            ...state,
            videos: sortedVideos,
            sortedIndexes: action.payload
        });

        // Save the sortedIndexes in local storage using StorageService
        this.storageService.set('sortedIndexes', action.payload);
    }

    @Action(EditVideoNote)
    editNote(ctx: StateContext<VideoStateModel>, action: EditVideoNote) {
        // Retrieve the current state
        const state = ctx.getState();

        // Update the note for the specific video
        const updatedVideos = state.videos.map(video => {
            if (video.id === action.videoId) {
                video.note = action.note;

                // Save the updated note in local storage using StorageService
                this.storageService.set(`note_${video.id}`, action.note);
            }
            return video;
        });

        // Update the state with the updated videos
        ctx.setState({
            ...state,
            videos: updatedVideos
        });
    }
    //#endregion
}