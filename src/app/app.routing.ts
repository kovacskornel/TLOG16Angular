import { RouterModule, Routes } from '@angular/router';

import { TaskListComponent } from './task-list/task-list.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  { path: '', redirectTo: 'calendar', pathMatch: 'full' },
  { path: 'calendar', component: CalendarComponent },
  { path: 'task-list', component: TaskListComponent },
];

export const routing = RouterModule.forRoot(routes);
