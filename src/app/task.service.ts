import { Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { mapTo, scan } from 'rxjs/operators';

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

  private taskStarts = new Observable();
  private taskCompletes = new Observable();
  private showSpinner = new Observable();

  private loadUp = this.taskStarts.pipe(mapTo(1));
  private loadDown = this.taskCompletes.pipe(mapTo(-1));

  private allLoadTypes = merge(this.loadDown, this.loadUp);

  private currentLoadCount = this.allLoadTypes.pipe(
      scan((totalCurrentLoads, changeInLoads) => totalCurrentLoads + changeInLoads, 0)
  )

  constructor() { }
}
