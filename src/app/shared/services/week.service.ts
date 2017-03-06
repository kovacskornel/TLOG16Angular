import { Injectable } from '@angular/core';
import { Week } from '../classes/week';

import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { WorkDayRB } from '../classes/WorkDayRB';

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

    constructor (private http: Http) {}

    getMonths () {
        return this.http.get(this.urlGetMonths)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteAll() {
        this.http.put(this.urlDeleteAll, this.options)
            .catch(this.handleError)
            .subscribe();
    }

    addWorkDay(workDay: WorkDayRB) {
        this.http.post(this.urlAddWorkDay, JSON.stringify(workDay), this.options)
            .catch(this.handleError)
            .subscribe();
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.json || { };
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
