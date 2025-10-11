import { Component, signal } from '@angular/core';
import { Timer } from './timer/timer';
import { CircleFactory } from './circle-factory/circle-factory';
import { ModeButton } from './mode-button/mode-button';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [Timer, CircleFactory, ModeButton],
  standalone: true
})
export class App {
  protected readonly title = signal('gomodoro');
}
