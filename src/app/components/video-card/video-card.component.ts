import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
  standalone: true
})
export class VideoCardComponent {

  @Input() video!: any;
  @Output() editCLicked = new EventEmitter();
  
}
