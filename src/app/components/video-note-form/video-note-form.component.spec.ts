import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoNoteFormComponent } from './video-note-form.component';

describe('VideoNoteFormComponent', () => {
  let component: VideoNoteFormComponent;
  let fixture: ComponentFixture<VideoNoteFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoNoteFormComponent]
    });
    fixture = TestBed.createComponent(VideoNoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
