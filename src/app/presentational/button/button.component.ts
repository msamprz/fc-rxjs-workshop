import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BackgroundTaskCounterService } from '../../background-task-counter.service';

@Component({
  selector: 'app-button',
  template: `
    <button mat-raised-button color="primary" (click)="triggerTask()">
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {
  @Input() click: () => Observable<any> = () => of();

  constructor(private backgroundTaskCounterService: BackgroundTaskCounterService) { }

  public triggerTask() {
    this.backgroundTaskCounterService.startTask(this.click());
  }
}
