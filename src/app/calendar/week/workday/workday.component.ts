import { Component, Input } from '@angular/core';
import { Day } from '../../../shared/classes/day';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { PagerService } from '../../../shared/services/pager.service';

@Component({
  selector: 'my-workday',
  templateUrl: 'workday.component.html',
})

export class WorkdayComponent {
  app = AppComponent;

  @Input() day: Day;

  constructor(
      private router: Router,
      private pagerService: PagerService,
  ) { }

  navigateTaskList() {
    this.pagerService.selectedDay = this.day;
    this.router.navigate(['/task-list']);
  }
}
