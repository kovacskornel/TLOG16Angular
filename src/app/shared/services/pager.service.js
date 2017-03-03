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
var core_1 = require("@angular/core");
var week_service_1 = require("./week.service.ts");
var week_1 = require("../classes/week");
var day_1 = require("../classes/day");
var PagerService = (function () {
    function PagerService(weekService) {
        this.weekService = weekService;
        this.monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.dayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }
    PagerService.prototype.createWeeks = function () {
        this.actualMonth = this.monthsOfYear[this.month];
        var firstDay = new Date(this.year, this.month, 1);
        var startingDay = (firstDay.getDay() + 6) % 7;
        var days = [];
        var weeks = [];
        var d;
        for (var i = 1; i <= startingDay; i++) {
            d = new day_1.Day();
            d.type = 'empty';
            days.push(d);
        }
        var dayCount = this.getMonthDayCount();
        var w;
        for (var i = 1; i <= dayCount; i++) {
            d = new day_1.Day();
            d.type = 'simple';
            d.day = i;
            d.month = this.month;
            d.year = this.year;
            days.push(d);
            if (days.length == 7) {
                w = new week_1.Week();
                w.days = days;
                days = [];
                weeks.push(w);
            }
        }
        if (days.length > 0) {
            w = new week_1.Week();
            w.days = days;
            weeks.push(w);
        }
        this.weekService.weeks = weeks;
        this.weekService.update();
    };
    PagerService.prototype.previousMonth = function () {
        this.month--;
        if (this.month < 0) {
            this.month = 11;
            this.year--;
        }
        this.createWeeks();
    };
    PagerService.prototype.nextMonth = function () {
        this.month = (this.month + 1) % 12;
        if (this.month == 0)
            this.year++;
        this.createWeeks();
    };
    PagerService.prototype.getMonthDayCount = function () {
        if (this.month == 1)
            return ((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0) ? 29 : 28;
        return this.dayInMonth[this.month];
    };
    PagerService.prototype.init = function () {
        if (this.weekService.weeks.length == 0) {
            var date = new Date();
            this.year = date.getFullYear();
            this.month = date.getMonth();
            this.createWeeks();
        }
        else {
            this.actualMonth = this.monthsOfYear[this.month];
        }
    };
    PagerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [week_service_1.WeekService])
    ], PagerService);
    return PagerService;
}());
exports.PagerService = PagerService;
//# sourceMappingURL=pager.service.js.map