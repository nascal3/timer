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
  formattedMinutes: string;
  newMin: any;
  interval: any;

  constructor() {
  }

  ngOnInit(): void {
    this.minutes = 25
    this.seconds = 0
    this.started = false
    this.formatToDoubleDigits(this.seconds)
    this.formattedMinutes = ("0" + this.minutes).slice(-2);
  }

  resetVariables(mins, secs, started) {
    this.minutes = mins
    this.seconds = secs
    this.started = started
    clearInterval(this.newMin);
    this.formatToDoubleDigits(this.seconds)
    this.formattedMinutes = ("0" + this.minutes).slice(-2);
  }

  start() {
    if (this.minutes === 0 && this.seconds === 0) return
    this.started = true
    this.newMin = setInterval(() => {
      this.intervalCallback()
    }, 1000)
  }

  addFive() {
    if (!this.started) return
    this.minutes = this.minutes + 5
    this.formattedMinutes = ("0" + this.minutes).slice(-2);
  }

  minusFive() {
    if (!this.started) return
    this.minutes = this.minutes - 5
    if (this.minutes <= 0 ) this.minutes = 0
    this.formattedMinutes = ("0" + this.minutes).slice(-2);
  }

  formatToDoubleDigits(time) {
    this.formattedSeconds = ("0" + time).slice(-2);
  }

  stop() {
    this.disableStartAndStopButtons()
    clearInterval(this.newMin);
    this.resetVariables(this.minutes, this.seconds, false)
  }

  disableStartAndStopButtons() {
    if (this.minutes === 0 && this.seconds === 0) return
  }

  intervalCallback() {
    this.formatToDoubleDigits(this.seconds--)
    if (this.minutes <= 0 && this.seconds <= 0 ) {
      this.minutes = 0
      this.seconds = 0
      this.stop()
    }

    if (this.seconds < 0) {
      this.seconds = 59
      this.formattedMinutes = ("0" + this.minutes--).slice(-2);
    }
  }
}
