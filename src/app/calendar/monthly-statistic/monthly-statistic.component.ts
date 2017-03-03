import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { WeekService } from '../../shared/services/week.service';

@Component({
    selector: 'my-monthly-statistic',
    templateUrl: 'monthly-statistic.component.html',
})

export class MonthlyStatisticComponent implements OnInit {
    app = AppComponent;

    constructor(public weekService: WeekService) { }

    ngOnInit() {
        this.weekService.update();
    }
}
