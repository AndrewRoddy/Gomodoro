import { Component, signal } from '@angular/core';
import { Timer } from './timer/timer';
import { CircleFactory } from './circle-factory/circle-factory';
import { ModeButton } from './mode-button/mode-button';
import { Back } from './back/back';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [Timer, CircleFactory, ModeButton, Back],
  standalone: true
})
export class App {
  protected readonly title = signal('gomodoro');
}
