import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ApiService } from './shared';
import { routing } from './app.routing';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { PagerService } from './shared/services/pager.service';
import { WeekService } from './shared/services/week.service';
import { TaskListComponent } from './task-list/task-list.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SimpleDayComponent } from './calendar/week/simple-day/simple-day.component';
import { AboutComponent } from './about/about.component';
import { WorkdayComponent } from './calendar/week/workday/workday.component';
import { WeekComponent } from './calendar/week/week.component';
import { MonthlyStatisticComponent } from './calendar/monthly-statistic/monthly-statistic.component';
import { DailyStatisticComponent } from './task-list/daily-statistic/daily-statistic.component';
import { PagerComponent } from './calendar/pager/pager.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TaskListComponent,
    CalendarComponent,
    SimpleDayComponent,
    WorkdayComponent,
    WeekComponent,
    MonthlyStatisticComponent,
    DailyStatisticComponent,
    PagerComponent,
  ],
  providers: [
    ApiService,
    WeekService,
    PagerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
