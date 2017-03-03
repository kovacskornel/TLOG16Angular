import { Task } from './task';

export class Day {
  type: string; // empty, simple, work
  year: number;
  month: number;
  day: number;
  requiredWorkMinutes = 0;
  minutes = 0;
  extraMinutes = 0;
  tasks: Task[] = [];

  getDate() { return this.year + '-' + this.month + '-' + this.day; }
}
