import { Component } from '@angular/core';
import { SharedModule } from '@shared/modules';
import { HttpClientModule } from '@angular/common/http';
import { YoutubeService } from '@shared/services';
import { VideoCardComponent, VideoNoteFormComponent } from '@components';
import { Video } from '@shared/models';
import Sortable from "sortablejs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    // modules
    SharedModule,
    HttpClientModule,

    // components
    VideoCardComponent,
    VideoNoteFormComponent
  ],
  providers: [
    YoutubeService
  ],
  standalone: true
})
export class HomeComponent {


  //#region variables
  videos: Video[] = [];
  channelId!: string;
  loading: boolean = false;
  error: boolean = false;
  //#endregion

  constructor(
    private youtubeService: YoutubeService
  ) {

  }

  initSortable() {
    const sortableElement = document.getElementById('sortableElement');
    if (sortableElement == null) return;

    var options: any = {
      animation: 200,
      handle: ".my-handle",
      ghostClass: "ghost",
      onSort: (evt: any) => {
        console.log('from index: ' + evt.oldIndex + ' to index: ' + evt.newIndex);
        setTimeout(() => {
          var sortedVideos = sortable.toArray();
          localStorage.setItem('videosOrder', JSON.stringify(sortedVideos));
        }, 200);
      }
    };
    var sortable = new Sortable(sortableElement, options);

  }

  fetchVideos() {
    if (!this.channelId) {
      return;
    }

    this.loading = true;
    this.videos = [];
    this.youtubeService.getVideos(this.channelId).then((res: any) => {
      this.loading = false;
      res.items.map((item: any) => {
        this.videos.push({
          title: item.snippet.title,
          imageUrl: item.snippet.thumbnails.default.url,
          id: item.id.videoId,
          note: this.getNote(item.id.videoId),
          editMode: false,
        });
      });

      this.sortVideos();
      setTimeout(() => {
        this.initSortable();
      }, 100);
    }, () => {
      this.loading = false;
      this.error = true;
    });
  }

  sortVideos() {
    var savedVideosOrderString = localStorage.getItem('videosOrder');
    if (savedVideosOrderString == null) return;
    var savedVideosOrder: any[] = JSON.parse(savedVideosOrderString);

    this.videos.sort((a: Video, b: Video) => {
      var aOrder = savedVideosOrder.findIndex(id => id == a.id);
      var bOrder = savedVideosOrder.findIndex(id => id == b.id);

      // If 'id' values are equal, compare the 'savedOrder' property
      if (aOrder < bOrder) return -1;
      if (aOrder > bOrder) return 1;

      // If 'id' and 'savedOrder' values are equal, compare the original index in the array
      return this.videos.indexOf(a) - this.videos.indexOf(b);
    });
  }

  editNote(note: string, video: Video) {
    var notesString = localStorage.getItem('notes');
    var notes: any[] = [];
    if (notesString) {
      notes = JSON.parse(notesString);
    }
    const noteIndex = notes.findIndex(x => x.Id == video.id);
    if (noteIndex == -1) {
      notes.push({
        Id: video.id,
        Note: note
      });
    } else {
      notes[noteIndex].Note = note;
    }
    console.log('notes', notes);
    localStorage.setItem('notes', JSON.stringify(notes));
    video.editMode = false;
    video.note = note;
  }

  getNote(videoId: string): string {
    var notesString = localStorage.getItem('notes');
    if (!notesString) return '';
    var notes = JSON.parse(notesString);
    const videNote = notes.find((x: any) => x.Id == videoId)?.Note;
    console.log('videNote', videNote);
    return videNote;
  }

}
