import { Injectable } from '@angular/core';
import { Week } from '../classes/week';

import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { WorkDayRB } from '../classes/workDayRB';
import { StartTaskRB } from '../classes/startTaskRB';
import { Day } from '../classes/day';

@Injectable()
export class WeekService {
    weeks: Week[] = [];

    workdays: number;
    reqWorkMinutes: number;
    minutes: number;
    extraMinutes: number;

    headers = new Headers({ 'Content-Type': 'application/json' });

    options = new RequestOptions({ headers: this.headers });

    urlGetMonths = 'http://localhost:9080/timelogger/workmonths/';
    urlDeleteAll = 'http://localhost:9080/timelogger/workmonths/deleteall';

    urlAddWorkDay = 'http://localhost:9080/timelogger/workmonths/workdays';

    urlGetTasks = 'http://localhost:9080/timelogger/workmonths/';
    urlStartTask = 'http://localhost:9080/timelogger/workmonths/workdays/tasks/start';

    constructor (private http: Http) {}

    getMonth(year: number, month: number) {
        return this.http.get(this.urlGetMonths + year + '/' + month)
            .map(this.extractDataText)
            .catch(this.handleError);
    }

    getTasks(day: Day) {
        let url = this. urlGetTasks + day.year + '/' + (day.month + 1) + '/' + day.day;
        // console.log(url);
        return this.http.get(url, this.options)
            .map(this.extractDataText)
            .catch(this.handleError);
    }

    deleteAll() {
        return this.http.put(this.urlDeleteAll, this.options)
            .catch(this.handleError);
    }

    addWorkDay(workDay: WorkDayRB) {
        return this.http.post(this.urlAddWorkDay, JSON.stringify(workDay), this.options)
            .map(this.extractDataText)
            .catch(this.handleError);
    }

    startTask(startTask: StartTaskRB) {
        this.http.post(this.urlStartTask, JSON.stringify(startTask), this.options)
            .catch(this.handleError)
            .subscribe();
    }

    private extractDataText(res: Response) {
        return res.text() || { };
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

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
