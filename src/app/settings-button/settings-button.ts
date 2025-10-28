import { Component, signal } from '@angular/core';
import { SettingsModal } from '../settings-modal/settings-modal';

@Component({
  selector: 'app-settings-button',
  imports: [SettingsModal],
  templateUrl: './settings-button.html',
  styleUrl: './settings-button.scss'
})
export class SettingsButton {
  // Signal to track modal visibility
  public isModalOpen = signal(false);

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }
}
