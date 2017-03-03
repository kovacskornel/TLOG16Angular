import { Injectable } from '@angular/core';
import { Week } from '../classes/week';

@Injectable()
export class WeekService {
    weeks: Week[] = [];

    workdays: number;
    reqWorkMinutes: number;
    minutes: number;
    extraMinutes: number;

    update() {
        this.reqWorkMinutes = 0;
        this.minutes = 0;
        this.extraMinutes = 0;
        this.workdays = 0;
        for (let w of this.weeks) {
            for (let d of w.days) {
                this.reqWorkMinutes += d.requiredWorkMinutes;
                this.minutes += d.minutes;
                this.extraMinutes += d.extraMinutes;
                if (d.type === 'work') {
                    this.workdays++;
                }
            }
        }
    }
}
