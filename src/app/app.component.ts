import { Component } from '@angular/core';

import '../style/app.scss';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'TLOG angular webpack';

  static getColor(n: number) {
    if (n >= 0) {
      return 'green';
    } else {
      return 'red';
    }
  }
}
