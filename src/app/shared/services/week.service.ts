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
import { DeleteTaskRB } from '../classes/DeleteTaskRB';
import { ModifyTaskRB } from '../classes/ModifyTaskRB';
import { FinishTaskRB } from '../classes/FinishTaskRB';

@Injectable()
export class WeekService {
    weeks: Week[] = [];
    minutes: number;
    extraMinutes: number;

    header = new Headers({ 'Content-Type': 'application/json' });
    options = new RequestOptions({ headers: this.header });

    link= 'http://127.0.0.1:9080/timelogger/workmonths/';

    GetMonths = this.link;
    DeleteAll = this.link + 'deleteall';
    AddWorkDay = this.link + 'workdays';
    GetTasks = this.GetMonths;
    StartTask = this.link + 'workdays/tasks/start';
    FinishTask = this.link + 'workdays/tasks/finish';
    ModifyTask = this.link + 'workdays/tasks/modify';
    DeleteTask = this.link + 'workdays/tasks/delete';

    constructor (private http: Http) {}

    getMonth(year: number, month: number) {
        return this.http.get(this.GetMonths + year + '/' + month)
            .map(this.extractDataText)
            .catch(this.handleError);
    }

    addWorkDay(workDay: WorkDayRB) {
        return this.http.post(this.AddWorkDay, JSON.stringify(workDay), this.options)
            .map(this.extractDataText)
            .catch(this.handleError);
    }

    getTasks(day: Day) {
        let url = this. GetTasks + day.year + '/' + (day.month + 1) + '/' + day.day;
        return this.http.get(url, this.options)
            .map(this.extractDataText)
            .catch(this.handleError);
    }
    startTask(startTask: StartTaskRB) {
        return this.http.post(this.StartTask, JSON.stringify(startTask), this.options)
            .catch(this.handleError);
    }
    finishTask(finishTask: FinishTaskRB) {
        return this.http.put(this.FinishTask, JSON.stringify(finishTask), this.options)
            .catch(this.handleError);
    }
    modifyTask(modifyTask: ModifyTaskRB) {
        return this.http.put(this.ModifyTask, JSON.stringify(modifyTask), this.options)
            .catch(this.handleError);
    }
    deleteTask(deleteTask: DeleteTaskRB) {
        return this.http.put(this.DeleteTask, JSON.stringify(deleteTask), this.options)
            .catch(this.handleError);
    }

    deleteAll() {
        return this.http.put(this.DeleteAll, this.options)
            .catch(this.handleError);
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
        this.minutes = 0;
        this.extraMinutes = 0;
        for (let week of this.weeks) {
            for (let day of week.days) {
                this.minutes += day.minutes;
                this.extraMinutes += day.extraMinutes;
            }
        }
    }
}
