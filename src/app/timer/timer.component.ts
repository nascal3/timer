import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
})
export class TimerComponent {

  started: boolean;
  minutes: number;
  seconds: number;
  newMin: number;
  interval: any;

  constructor() {
  }

  resetVariables(mins, secs, started) {
    this.minutes = mins
    this.seconds = secs
    this.started = started
  }

  start() {
   setInterval(() => {
     this.seconds += this.seconds
     if (this.seconds === 60) {
       this.minutes += this.minutes
       this.seconds = 0
     }
   }, 1000)
  }

  addFive() {
    this.minutes + 5
  }

  minusFive() {
    this.minutes - 5
  }


  stop() {

  }

  reset() {

  }

  intervalCallback() {

  }

}
