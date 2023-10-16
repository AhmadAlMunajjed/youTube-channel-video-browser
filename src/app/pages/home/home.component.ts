import { Component } from '@angular/core';
import { SharedModule } from '@shared/modules';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    SharedModule
  ],
  standalone: true
})
export class HomeComponent {

  videos = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}
