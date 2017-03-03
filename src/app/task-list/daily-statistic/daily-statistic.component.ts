import { Component, Input } from '@angular/core';
import { Day } from '../../shared/classes/day';

@Component({
    selector: 'my-daily-statistic',
    templateUrl: 'daily-statistic.component.html',
})

export class DailyStatisticComponent {
    @Input() day: Day;
}
