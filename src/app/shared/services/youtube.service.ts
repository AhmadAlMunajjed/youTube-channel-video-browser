import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  //#region varialbes
  private maxResults = 30;
  //#endregion

  constructor(
    private http: HttpClient,
  ) { }

  getVideos(channelId: string): Observable<any[]> {
    return this.http.get<any[]>(this.getVideosApiUrl(channelId));
  }

  private getVideosApiUrl(channelId: string): string {
    return `https://www.googleapis.com/youtube/v3/search?key=${environment.youtubeApiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${this.maxResults}`;
  }

}