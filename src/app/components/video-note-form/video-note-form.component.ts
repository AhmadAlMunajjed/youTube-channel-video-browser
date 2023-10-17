import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '@shared/modules';

@Component({
  selector: 'app-video-note-form',
  templateUrl: './video-note-form.component.html',
  styleUrls: ['./video-note-form.component.scss'],
  standalone: true,
  imports: [
    SharedModule
  ]
})
export class VideoNoteFormComponent {

  note!: string;
  @Input() video!: any;
  @Output() saved = new EventEmitter<string>();
  @Output() canceld = new EventEmitter();

  ngAfterViewInit() {
    if(!this.note) {
      this.note = this.video?.note;
    }
  }
}
