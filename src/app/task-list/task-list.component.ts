import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Day } from '../shared/classes/day';
import { PagerService } from '../shared/services/pager.service';
import { WeekService } from '../shared/services/week.service';
import { StartTaskRB } from '../shared/classes/startTaskRB';
import { FinishTaskRB } from '../shared/classes/FinishTaskRB';
import { DeleteTaskRB } from '../shared/classes/DeleteTaskRB';
import { ModifyTaskRB } from '../shared/classes/ModifyTaskRB';

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
    startTask.startTime = this.getTimeNow();

    this.weekService.startTask(startTask).subscribe(() => this.refreshTasks());
  }

  finishTask(task: any) {
   if (!task) {
      return;
   }
   let finishTask = new FinishTaskRB();
   finishTask.year = this.day.year;
   finishTask.month = this.day.month + 1;
   finishTask.day = this.day.day;
   finishTask.taskId = task.taskId;
   if (task.startTime) {
     finishTask.startTime = task.startTime.hour + ':' + task.startTime.minute;
   }
   finishTask.endTime = task.endTime;
   this.weekService.finishTask(finishTask).subscribe(() => this.refreshTasks());
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

  modifyTask(taskId: string, comment: string, startHour: string, startMinute: string, endHour: string, endMinute: string) {

    let modifyTask = new ModifyTaskRB();
    modifyTask.year = this.day.year;
    modifyTask.month = this.day.month + 1;
    modifyTask.day = this.day.day;
    modifyTask.taskId = this.selectedTask.taskId;

    modifyTask.newTaskId = taskId;
    modifyTask.newComment = comment;

    if (this.selectedTask.startTime) {
      modifyTask.startTime = this.selectedTask.startTime.hour + ':' + this.selectedTask.startTime.minute;
      modifyTask.newStartTime = startHour + ':' + startMinute;
    }
    if (this.selectedTask.endTime) {
      modifyTask.newEndTime = endHour + ':' + endMinute;
    }

    this.weekService.modifyTask(modifyTask).subscribe(() => this.refreshTasks());
    this.selectedTask = null;
  }

  refreshTasks() {
    if (this.day) {
      this.weekService.getTasks(this.day).subscribe(data => this.getTasks(data));
    }
  }

  getTasks(jsonData: string) {
    this.day.tasks = JSON.parse(jsonData);
  }

  getTimeNow() {
    let date = new Date();
    let minutes = (date.getMinutes() - (date.getMinutes() % 15)) + '';
    if (minutes === '0' || minutes === '') {
      minutes = '00';
    }

    return date.getHours() + ':' + minutes;
  }

  onSelect(t: any): void {
    this.selectedTask = t;
  }
}
