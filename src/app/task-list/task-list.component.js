"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require('rxjs/add/operator/switchMap');
var core_1 = require('@angular/core');
var task_1 = require(".././task");
var pager_service_1 = require(".././pager.service");
var TaskListComponent = (function () {
    function TaskListComponent(pagerService) {
        this.pagerService = pagerService;
    }
    TaskListComponent.prototype.ngOnInit = function () {
        this.day = this.pagerService.selectedDay;
        /*for(let i = 0; i < 10; i++) {
          this.day.tasks.push(new Task());
        }*/
    };
    TaskListComponent.prototype.add = function (id) {
        if (!id)
            return;
        var t = new task_1.Task();
        t.id = id;
        this.day.tasks.push(t);
    };
    TaskListComponent.prototype.deleteTask = function (task) {
        this.day.tasks = this.day.tasks.filter(function (t) { return t !== task; });
        if (this.selectedTask === task)
            this.selectedTask = null;
    };
    TaskListComponent.prototype.modifyDay = function (minutes) {
        //this.day.requiredWorkMinutes = +reqMin;
        this.day.minutes = +minutes;
        this.day.extraMinutes = this.day.minutes - this.day.requiredWorkMinutes;
    };
    TaskListComponent.prototype.modifyTask = function (id, comment, startHour, startMinute, endHour, endMinute) {
        this.selectedTask.id = id;
        this.selectedTask.comment = comment;
        this.selectedTask.startHour = +startHour;
        this.selectedTask.startMinute = +startMinute;
        this.selectedTask.endHour = +endHour;
        this.selectedTask.endMinute = +endMinute;
    };
    TaskListComponent.prototype.onSelect = function (t) {
        this.selectedTask = t;
    };
    TaskListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'task-list',
            templateUrl: 'task-list.component.html',
            styleUrls: ['../../../styles.css'],
        }), 
        __metadata('design:paramtypes', [pager_service_1.PagerService])
    ], TaskListComponent);
    return TaskListComponent;
}());
exports.TaskListComponent = TaskListComponent;
//# sourceMappingURL=task-list.component.js.map