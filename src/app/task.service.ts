import { Injectable } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, mapTo, scan, shareReplay, startWith } from 'rxjs/operators';

/*
* Sources of task initiation and completion:
*   timer(6000).subscribe(...)
*   setTimeout(() => {...}, 6000)
*   fetch('someapi.com', (...) => {...})
* */

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  /*
  * How do we count?
  *   Start from 0
  *   When an async task starts, increase the count by 1
  *   When an async task ends, decrease the count by 1
  * */

  private taskStarts = new Subject();
  private taskCompletes = new Subject();
  private showSpinner = new Observable();

  private loadUp = this.taskStarts.pipe(mapTo(1));
  private loadDown = this.taskCompletes.pipe(mapTo(-1));

  private allLoadTypes = merge(this.loadDown, this.loadUp);

  private currentLoadCount = this.allLoadTypes.pipe(
    startWith(0),
    scan((totalCurrentLoads, changeInLoads) => {
      const newLoadCount = totalCurrentLoads + changeInLoads;

      return newLoadCount < 0 ? 0 : newLoadCount;
    }),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor() { }

  public startTask() {
    this.taskStarts.next();
  }

  public endTask() {
    this.taskCompletes.next();
  }
}

// https://stackblitz.com/edit/rxjs-6uyaid?file=index.ts
