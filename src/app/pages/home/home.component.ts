import { Component } from '@angular/core';
import { SharedModule } from '@shared/modules';
import { HttpClientModule } from '@angular/common/http';
import { YoutubeService } from '@shared/services';
import { VideoCardComponent, VideoNoteFormComponent } from '@components';

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
  videos = [] as any[];
  channelId!: string;
  loading: boolean = false;
  error: boolean = false;
  //#endregion

  /**
   *
   */
  constructor(
    private youtubeService: YoutubeService
  ) {

  }

  fetchVideos() {
    if (!this.channelId) {
      return;
    }

    this.loading = true;
    this.videos = [];
    this.youtubeService.getVideos(this.channelId).then((res: any) => {
      this.loading = false;
      console.log(res);
      res.items.map((item: any) => {
        this.videos.push({
          title: item.snippet.title,
          imageUrl: item.snippet.thumbnails.default.url,
          id: item.id.videoId,
          // note: this.getNote(item.id.videoId),
          // immutableNote: this.getNote(item.id.videoId),
          editMode: false,
        });
      });
    }, () => {
      this.loading = false;
      this.error = true;
    });
  }

  reorder() {

  }

  editNote(video: any) {

  }
}
