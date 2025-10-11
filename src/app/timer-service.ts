import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  
  // counterSubject = new BehaviorSubject<number>(0);
  // counter$ = this.counterSubject.asObservable();

  // update(value: number) {
  //   this.counterSubject.next(value);
  // }
  readonly seconds = signal(0);
  readonly total = signal(60*60);

  updateSeconds (value: number) {
    this.seconds.set(value);
  }

  updateTotal (value: number) {
    this.total.set(value);
  }
}

