import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Timer } from './timer/timer';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [Timer],
  standalone: true
})
export class App {
  protected readonly title = signal('gomodoro');
}
