import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
})
export class TimerComponent implements OnInit{

  started: boolean;
  minutes: number;
  seconds: number;
  formattedSeconds: string;
  newMin: any;
  interval: any;

  constructor() {
  }

  ngOnInit(): void {
    this.minutes = 25
    this.seconds = 0
    this.formatSecondsToDoubleDigits(this.seconds)
  }

  resetVariables(mins, secs, started) {
    this.minutes = mins
    this.seconds = secs
    this.started = started
    this.formatSecondsToDoubleDigits(this.seconds)
  }

  start() {
    this.started = true
    this.newMin = setInterval(() => {
      this.intervalCallback()
    }, 1000)
  }

  addFive() {
    this.minutes = this.minutes + 5
  }

  minusFive() {
    this.minutes = this.minutes - 5
  }

  formatSecondsToDoubleDigits(seconds) {
    this.formattedSeconds = ("0" + seconds).slice(-2);
  }


  stop() {
    clearInterval(this.newMin);
    this.resetVariables(this.minutes, this.seconds, false)
  }

  intervalCallback() {
      this.formatSecondsToDoubleDigits(this.seconds++)
      if (this.seconds === 60) {
        this.minutes++
        this.seconds = 0
      }
  }

}
