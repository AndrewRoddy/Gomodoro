import { Component, signal } from '@angular/core';

// Importing all components
import { Timer } from './timer/timer';
import { CircleFactory } from './circle-factory/circle-factory';
import { ModeButton } from './mode-button/mode-button';
import { Back } from './back/back';
import { PauseButton } from './pause-button/pause-button';
import { SettingsButton } from './settings-button/settings-button';
import { FaviconManager } from './favicon-manager/favicon-manager';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  // Importing components into app.html
  imports: [
    Timer,
    CircleFactory,
    ModeButton,
    PauseButton,
    SettingsButton,
    FaviconManager
  ],
  standalone: true
})
export class App {
  protected readonly title = signal('gomodoro');
}
