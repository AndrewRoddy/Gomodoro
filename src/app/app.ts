import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { Timer } from './timer/timer';
// import { Circle } from './circle/circle';
import { CircleFactory } from './circle-factory/circle-factory';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [Timer, CircleFactory],
  standalone: true
})
export class App {
  protected readonly title = signal('gomodoro');
}
