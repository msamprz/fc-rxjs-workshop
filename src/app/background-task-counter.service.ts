import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackgroundTaskCounterService {
  taskCount: number = 0;

  constructor() { }

  startTask(asyncTask: Observable<any>) {
    this.taskCount++;

    asyncTask.pipe(take(1)).subscribe(() => {
      this.taskCount--;
    })
  }
}
