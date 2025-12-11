import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerService } from "../timer-service";

@Component({
  selector: 'app-settings-modal',
  imports: [CommonModule],
  templateUrl: './settings-modal.html',
  styleUrl: './settings-modal.scss'
})
export class SettingsModal {

  // Gets timer service
  private timerService = inject(TimerService);

  // expose the ratio signal from the timer service
  // public undoTime = this.timerService.undoTimestamp;
  public seconds = this.timerService.seconds;
  public undoTime = this.timerService.undoTimestamp;
  public ratio = this.timerService.ratio;
  public theme = this.timerService.theme;
  public hideCircles = this.timerService.hideCircles;
  
  // options for ratio (work : break)
  public ratioOptions = [1, 2, 3, 4, 5];
  public removeOptions = [1, 5, 15, 60];
  public themeOptions = ["Light", "Dark", "Midnight"];
  public hideCircleOptions = ["Show", "Hide"];

  setRatio(value: number) {
    this.timerService.updateRatio(value);
  }
  
  setTheme(value: string) {
    this.timerService.updateTheme(value);
  }
  
  setCircles(value: string) {
    this.timerService.updateHiddenCircles(value);
  }

  removeTime(secs: number) {
    let minutes = secs * 60
    let newTime = this.timerService.seconds() - minutes
    if (newTime <= 0) newTime = 0
    this.timerService.updateSeconds(newTime);
    this.timerService.triggerRefresh();
  }
  
  addTime(secs: number) {
    let minutes = secs * 60
    let newTime = this.timerService.seconds() + minutes
    if (newTime <= 0) newTime = 0
    this.timerService.updateSeconds(newTime);
    this.timerService.triggerRefresh();
  }
  
  resetTimer() {
    this.timerService.updateSeconds(0);
  }

  undoTimer() {
    this.timerService.updateSeconds(this.undoTime());
  }
}
