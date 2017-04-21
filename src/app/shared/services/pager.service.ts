import { Injectable } from '@angular/core';
import { WeekService } from './week.service';
import { Week } from '../classes/week';
import { Day } from '../classes/day';

@Injectable()
export class PagerService {
    year: number;
    month: number;

    monthsOfYear = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
        'November', 'December' ];
    dayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    actualMonth: string;

    selectedDay: Day;

    constructor(private weekService: WeekService) { }

    createWeeks(jsonData: string) {
        this.actualMonth = this.monthsOfYear[this.month];

        let workdays: any[] = JSON.parse(jsonData);

        let firstDay = new Date(this.year, this.month, 1);
        let startingDay = (firstDay.getDay() + 6) % 7;

        let days: Day[] = [];
        let weeks: Week[] = [];
        let d: Day;
        for (let i = 1; i <= startingDay; i++) {
            d = new Day();
            d.type = 'empty';
            days.push(d);
        }

        let dayCount = this.getMonthStats();
        let w: Week;
        for (let i = 1; i <= dayCount; i++) {
            d = new Day();
            d.type = 'simple';
            for (let wd of workdays) {
                if (wd.actualDay.dayOfMonth === i) {
                    d.type = 'work';
                    d.extraMinutes = wd.extraMinPerDay;
                    d.minutes = wd.sumMinPerDay;
                }
            }

            d.day = i;
            d.month = this.month;
            d.year = this.year;
            days.push(d);
            if (days.length === 7) {
                w = new Week();
                w.days = days;
                days = [];
                weeks.push(w);
            }
        }

        if (days.length > 0) {
            w = new Week();
            w.days = days;
            weeks.push(w);
        }

        this.weekService.weeks = weeks;
        this.weekService.update();
    }

    previousMonth() {
        this.month--;
        if (this.month < 0) {
            this.month = 11;
            this.year--;
        }

        this.refresh();
    }

    nextMonth() {
        this.month = (this.month + 1) % 12;
        if (this.month === 0) {
            this.year++;
        }

        this.refresh();
    }

    getMonthStats() {
        if (this.month === 1) {
            return ((this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0) ? 29 : 28;
        }

        return this.dayInMonth[this.month];
    }

    refresh() {
        this.weekService.getMonth(this.year, this.month + 1).subscribe(data => this.createWeeks(data));
    }

    init() {
        if (this.weekService.weeks.length === 0) {
            let date = new Date();
            this.year = date.getFullYear();
            this.month = date.getMonth();
            this.refresh();
        } else {
            this.actualMonth = this.monthsOfYear[this.month];
        }
    }
}
