import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Day } from '../shared/classes/day';
import { PagerService } from '../shared/services/pager.service';
import { WeekService } from '../shared/services/week.service';
import { StartTaskRB } from '../shared/classes/startTaskRB';

@Component({
  selector: 'my-task-list',
  templateUrl: 'task-list.component.html',
})

export class TaskListComponent implements OnInit {
  day: Day;
  selectedTask: any;

  constructor(
      private pagerService: PagerService,
      private weekService: WeekService,
  ) { }

  ngOnInit() {
    this.day = this.pagerService.selectedDay;

    if (this.day) {
      this.weekService.getTasks(this.day).subscribe(data => this.getTasks(data));
    }
  }

  getTasks(jsonData: string) {
    // console.log(jsonData);
    this.day.tasks = JSON.parse(jsonData);
  }

  addTask(id: string) {
    if (!id)  {
      return;
    }

    let startTask = new StartTaskRB();
    startTask.year = this.day.year;
    startTask.month = this.day.month + 1;
    startTask.day = this.day.day;
    startTask.taskId = id;
    startTask.startTime = '9:30';
    this.weekService.startTask(startTask);
  }

  deleteTask(task: any) {
    this.day.tasks = this.day.tasks.filter(t => t !== task);
    if (this.selectedTask === task) {
      this.selectedTask = null;
    }
  }

  modifyDay(minutes: number) {
    // this.day.requiredWorkMinutes = +reqMin;
    this.day.minutes = +minutes;
    this.day.extraMinutes = this.day.minutes - this.day.requiredWorkMinutes;
  }

  modifyTask(id: string, comment: string, startHour: string, startMinute: string, endHour: string, endMinute: string) {
    this.selectedTask.id = id;
    this.selectedTask.comment = comment;
    this.selectedTask.startHour = +startHour;
    this.selectedTask.startMinute = +startMinute;
    this.selectedTask.endHour = +endHour;
    this.selectedTask.endMinute = +endMinute;
  }

  onSelect(t: any): void {
    this.selectedTask = t;
  }
}
