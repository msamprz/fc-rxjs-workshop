import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BackgroundTaskCounterService } from './background-task-counter.service';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="centered">
      <h1>Slow tasks</h1>
      <app-button [click]="triggerTask(3000)">Start slow task - 3s</app-button>
      <app-button [click]="triggerTask(6000)">Start very slow task - 6s</app-button>

      <h1>Fast tasks</h1>
      <app-button [click]="triggerTask(2200)">Start quick task - 2200ms</app-button>
      <app-button [click]="triggerTask(300)">Start very quick task - 300ms</app-button>

      <strong>Background tasks: {{ backgroundTaskCounterService.taskCount }}</strong>

      <app-smart-spinner></app-smart-spinner>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public backgroundTaskCounterService: BackgroundTaskCounterService, private taskService: TaskService) {}

  public triggerTask(time: number) {
    return () => {
      this.taskService.startTask();
      return timer(time).pipe(tap(() => this.taskService.endTask()));
    };
  }
}
