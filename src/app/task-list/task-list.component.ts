import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Day } from '../shared/classes/day';
import { Task } from '../shared/classes/task';
import { PagerService } from '../shared/services/pager.service';

@Component({
  selector: 'my-task-list',
  templateUrl: 'task-list.component.html',
})

export class TaskListComponent implements OnInit {
  day: Day;
  selectedTask: Task;

  constructor(private pagerService: PagerService) { }

  ngOnInit() {
    this.day = this.pagerService.selectedDay;
  }

  add(id: string) {
    if (!id)  {
      return;
    }

    let t = new Task();
    t.id = id;
    this.day.tasks.push(t);
  }

  deleteTask(task: Task) {
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

  onSelect(t: Task): void {
    this.selectedTask = t;
  }
}
