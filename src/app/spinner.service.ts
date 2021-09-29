import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  public isShowing: boolean = false;

  constructor() { }

  public hide() {
    this.isShowing = false;
  }

  public show(): void {
    this.isShowing = true;
  }
}
