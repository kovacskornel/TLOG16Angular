import { Component } from '@angular/core';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['../style/app.scss'],
})
export class AppComponent {
  title = 'TimeLogger';

  static getColor(n: number) {
    if (n >= 0) {
      return 'green';
    } else {
      return 'red';
    }
  }
}
