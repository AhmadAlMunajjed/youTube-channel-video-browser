import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class YoutubeService {

  //#region varialbes
  private maxResults = 30;
  //#endregion

  constructor(
    private httpClient: HttpClient,
  ) { }

  getVideos(channelId: string) {
    return this.httpClient.get(this.getVideosApiUrl(channelId)).toPromise();
  }

  private getVideosApiUrl(channelId: string): string {
    return `https://www.googleapis.com/youtube/v3/search?key=${environment.youtubeApiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${this.maxResults}`;
  }

}
