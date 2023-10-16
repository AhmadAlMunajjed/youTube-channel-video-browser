import { Component } from '@angular/core';
import { SharedModule } from '@shared/modules';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { YoutubeService } from '@shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    SharedModule,
    HttpClientModule
  ],
  providers: [
    YoutubeService
  ],
  standalone: true
})
export class HomeComponent {

  videos = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  /**
   *
   */
  constructor(
    private youtubeService: YoutubeService
  ) {
    
  }
}
