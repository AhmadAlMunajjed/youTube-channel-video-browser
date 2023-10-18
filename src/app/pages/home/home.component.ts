import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '@shared/modules';
import { VideoCardComponent, VideoNoteFormComponent } from '@components';
import { Video } from '@shared/models';
import Sortable from "sortablejs";
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { VideoState } from '@store/states';
import { EditVideoNote, FetchVideos, SortVideos } from '@store/actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    // modules
    SharedModule,

    // components
    VideoCardComponent,
    VideoNoteFormComponent
  ],
  standalone: true
})
export class HomeComponent {

  //#region variables
  channelId!: string;
  editingVideoId: string | null = null;
  @ViewChild('sortableElement') sortableElement!: ElementRef<HTMLElement>;

  @Select(VideoState.getVideos) videos$!: Observable<Video[]>;
  @Select(VideoState.isLoading) loading$!: Observable<boolean>;
  @Select(VideoState.hasError) error$!: Observable<boolean>;

  //#endregion

  constructor(
    private store: Store
  ) {
    
  }

  ngAfterViewInit(): void {
    this.videos$.subscribe(videos => {
      console.log('videos', videos);
      setTimeout(() => {
        this.initSortable();
      }, 200);
    });
  }

  initSortable() {
    const sortableElement = document.getElementById('sortableElement');
    // const sortableElement = this.sortableElement.nativeElement;
    console.log('sortableElement', sortableElement);
    if (sortableElement == null) return;

    var options: any = {
      animation: 200,
      handle: ".my-handle",
      ghostClass: "ghost",
      onSort: (evt: any) => {
        console.log('from index: ' + evt.oldIndex + ' to index: ' + evt.newIndex);
        setTimeout(() => {
          this.sortVideos(sortable.toArray());
        }, 200);
      }
    };
    var sortable = new Sortable(sortableElement, options);

  }

  fetchVideos(): void {
    this.store.dispatch(new FetchVideos(this.channelId));
  }

  sortVideos(sortedIndexes: string[]): void {
    this.store.dispatch(new SortVideos(sortedIndexes));
  }


  editVideoNote(videoId: string, note: string): void {
    this.store.dispatch(new EditVideoNote(videoId, note));
  }

  /**
   * Toggle edit mode for this video
   * @param videoId 
   */
  toggleEditMode(videoId: string): void {
    this.editingVideoId = this.isVideoEditModeEnabled(videoId) ? null : videoId;
  }

  isVideoEditModeEnabled(videoId: string): boolean {
    return this.editingVideoId === videoId;
  }
}
