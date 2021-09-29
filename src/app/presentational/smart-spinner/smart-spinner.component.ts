import { Component } from '@angular/core';
import { SpinnerService } from '../../spinner.service';

@Component({
  selector: 'app-smart-spinner',
  template: `
    <mat-spinner
        *ngIf="spinnerService.isShowing"
        color="accent"
        mode="indeterminate">
    </mat-spinner>
  `,
  styles: [
  ]
})
export class SmartSpinnerComponent {

  constructor(public spinnerService: SpinnerService) { }
}
