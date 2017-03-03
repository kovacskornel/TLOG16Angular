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
var core_1 = require('@angular/core');
var week_service_1 = require(".././week.service");
var pager_service_1 = require(".././pager.service");
var CalendarComponent = (function () {
    function CalendarComponent(weekService, pagerService) {
        this.weekService = weekService;
        this.pagerService = pagerService;
        this.daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    }
    CalendarComponent.prototype.ngOnInit = function () {
        this.pagerService.init();
    };
    CalendarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'calendar',
            templateUrl: 'calendar.component.html',
            styleUrls: ['../../../styles.css']
        }), 
        __metadata('design:paramtypes', [week_service_1.WeekService, pager_service_1.PagerService])
    ], CalendarComponent);
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;
//# sourceMappingURL=calendar.component.js.map