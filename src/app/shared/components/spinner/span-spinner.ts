import {Component, input} from '@angular/core';

@Component({
  selector: 'span-spinner',
  imports: [],
  templateUrl: './span-spinner.html',
  host: {
    class: 'inline-flex items-center justify-center'
  }
})
export class SpanSpinner {
  text = input.required<string>();

}
