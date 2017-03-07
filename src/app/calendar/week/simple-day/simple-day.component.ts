import { Component, Input } from '@angular/core';
import { Day } from '../../../shared/classes/day';
import { WeekService } from '../../../shared/services/week.service';
import { WorkDayRB } from '../../../shared/classes/workDayRB';

@Component({
  selector: 'my-simple-day',
  templateUrl: 'simple-day.component.html',
})

export class SimpleDayComponent {
  @Input() day: Day;

  constructor(private weekService: WeekService) {}

  newWorkday() {
    let workDay = new WorkDayRB();
    workDay.year = this.day.year;
    workDay.month = this.day.month + 1;
    workDay.day = this.day.day;
    workDay.requiredHours = 450;
    this.weekService.addWorkDay(workDay).subscribe(data => this.responseNewWorkDay(data));

    this.weekService.update();
  }

  responseNewWorkDay(jsonData: string) {
    try {
      let workday = JSON.parse(jsonData);

      this.day.type = 'work';
      this.day.requiredWorkMinutes = workday.requiredMinPerDay;
      this.day.extraMinutes = workday.extraMinPerDay;
      this.day.minutes = workday.sumMinPerDay;
    } catch (Error) { console.log(Error.message); }
  }
}
