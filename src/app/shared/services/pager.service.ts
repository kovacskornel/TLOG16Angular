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

    createWeeks() {
        this.actualMonth = this.monthsOfYear[this.month];

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

        let dayCount = this.getMonthDayCount();
        let w: Week;
        for (let i = 1; i <= dayCount; i++) {
            d = new Day();
            d.type = 'simple';
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
        this.createWeeks();
    }

    nextMonth() {
        this.month = (this.month + 1) % 12;
        if (this.month === 0) {
            this.year++;
        }
        this.createWeeks();
    }

    getMonthDayCount() {
        if (this.month === 1) {
            return ((this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0) ? 29 : 28;
        }

        return this.dayInMonth[this.month];
    }

    init() {
        if (this.weekService.weeks.length === 0) {
            let date = new Date();
            this.year = date.getFullYear();
            this.month = date.getMonth();
            this.createWeeks();
        } else {
            this.actualMonth = this.monthsOfYear[this.month];
        }
    }
}
