import { Component, signal } from '@angular/core';

// Importing all components
import { Timer } from '../timer/timer';
import { CircleFactory } from '../circle-factory/circle-factory';
import { ModeButton } from '../mode-button/mode-button';
import { PauseButton } from '../pause-button/pause-button';
import { SettingsButton } from '../settings-button/settings-button';
import { FaviconManager } from '../favicon-manager/favicon-manager';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
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
export class HomeComponent {
  protected readonly title = signal('gomodoro');
}
