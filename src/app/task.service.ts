import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskStarts = new Observable();
  private taskCompletes = new Observable();
  private showSpinner = new Observable();

  constructor() { }
}
