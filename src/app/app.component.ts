import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { filter, pairwise, switchMap, takeUntil, tap } from 'rxjs/operators';
import { BackgroundTaskCounterService } from './background-task-counter.service';
import { SpinnerService } from './spinner.service';
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
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private showSpinner = new Observable<any>(() => {
    // I've been subscribed to!
    this.spinnerService.show()

    return () => {
      // I've been unsubscribed from
      this.spinnerService.hide();
    };
  });

  constructor(
      public backgroundTaskCounterService: BackgroundTaskCounterService,
      private taskService: TaskService,
      private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    /*
    * When does the loader need to hide?
    *   When the counter is at 0 -> no tasks are left
    * */
    const shouldHideSpinner = this.taskService.currentLoadCount.pipe(
        filter(count => count === 0)
    );
    /*
    * When does the loader need to show?
    *   When the counter goes from 0 to 1 -> tasks have started
    * */
    const shouldShowSpinner = this.taskService.currentLoadCount.pipe(
        pairwise(),
        filter(([prevCount, currentCount]: [number, number]) => prevCount === 0 && currentCount === 1)
    );

    const spinnerState = shouldShowSpinner.pipe(
        switchMap(() => this.showSpinner.pipe(takeUntil(shouldHideSpinner)))
    ).subscribe();

    this.subscriptions.push(spinnerState);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public triggerTask(time: number) {
    return () => {
      this.taskService.startTask();
      return timer(time).pipe(tap(() => this.taskService.endTask()));
    };
  }
}
