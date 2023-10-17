import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Video } from "@shared/models";
import { EditNote, SortVideos } from "../actions";

// export namespace Videos {
export class VideoStateModel {
    videos: Video[] = [];
    loading: boolean = false;
    error: boolean = false;
}

@State<VideoStateModel>({
    name: 'videos',
    defaults: {
        videos: [],
        loading: false,
        error: false
    }
})

export class VideoState {
    @Selector()
    static getVideos(state: VideoStateModel) {
        return state.videos;
    }

    @Selector()
    static getLoading(state: VideoStateModel) {
        return state.loading;
    }

    @Selector()
    static getError(state: VideoStateModel) {
        return state.error;
    }

    @Action(EditNote)
    editNote({ getState, patchState }: StateContext<VideoStateModel>, { payload }: EditNote) {
        const state = getState();
        const videos = [...state.videos];
        const index = videos.findIndex(v => v.id === payload.id);
        videos[index] = payload;
        patchState({
            videos
        });
    }

    @Action(SortVideos)
    sortVideos({ getState, patchState }: StateContext<VideoStateModel>, { payload }: SortVideos) {
        const state = getState();
        const videos = [...state.videos];
        videos.sort((a: Video, b: Video) => {
            const aOrder = payload.findIndex(id => id === a.id);
            const bOrder = payload.findIndex(id => id === b.id);
            if (aOrder < bOrder) return -1;
            if (aOrder > bOrder) return 1;
            return videos.indexOf(a) - videos.indexOf(b);
        });
        patchState({
            videos
        });
    }
    
}


// }
