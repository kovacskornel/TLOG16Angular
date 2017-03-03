import { Component, Input } from '@angular/core';
import { Day } from '../../../shared/classes/day';
import { WeekService } from '../../../shared/services/week.service';

@Component({
  selector: 'my-simple-day',
  templateUrl: 'simple-day.component.html',
})

export class SimpleDayComponent {
  @Input() day: Day;

  constructor(private weekService: WeekService) {}

  makeWorkday() {
    this.day.type = 'work';
    this.day.requiredWorkMinutes = 400;
    this.day.minutes = Math.floor(Math.random() * 600);
    this.day.extraMinutes = this.day.minutes - this.day.requiredWorkMinutes;
    this.weekService.update();
  }
}
