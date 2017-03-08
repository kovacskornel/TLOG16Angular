import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Day } from '../shared/classes/day';
import { PagerService } from '../shared/services/pager.service';
import { WeekService } from '../shared/services/week.service';
import { StartTaskRB } from '../shared/classes/startTaskRB';
import { DeleteTaskRB } from '../shared/classes/DeleteTaskRB';

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

    this.refreshTasks();
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
    this.weekService.startTask(startTask).subscribe(() => this.refreshTasks());
  }

  deleteTask(task: any) {
    if (!task) {
      return;
    }

    if (this.selectedTask === task) {
      this.selectedTask = null;
    }

    let deleteTask = new DeleteTaskRB();
    deleteTask.year = this.day.year;
    deleteTask.month = this.day.month + 1;
    deleteTask.day = this.day.day;
    deleteTask.taskId = task.taskId;
    if (task.startTime) {
      deleteTask.startTime = task.startTime.hour + ':' + task.startTime.minute;
    }

    this.weekService.deleteTask(deleteTask).subscribe(() => this.refreshTasks());
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

  refreshTasks() {
    if (this.day) {
      this.weekService.getTasks(this.day).subscribe(data => this.getTasks(data));
    }
  }

  getTasks(jsonData: string) {
    this.day.tasks = JSON.parse(jsonData);
  }

  onSelect(t: any): void {
    this.selectedTask = t;
  }
}
