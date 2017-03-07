import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { WeekService } from '../shared/services/week.service';
import { PagerService } from '../shared/services/pager.service';

@Component({
  selector: 'my-calendar',
  templateUrl: 'calendar.component.html',
})

export class CalendarComponent implements OnInit {
  daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  constructor(
      public weekService: WeekService,
      private pagerService: PagerService,
  ) { }

  deleteAll() {
    this.weekService.deleteAll().subscribe(() => this.pagerService.refresh());
  }

  ngOnInit(): void {
    this.pagerService.init();
  }
}
