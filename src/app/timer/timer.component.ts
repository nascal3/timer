import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
})
export class TimerComponent implements OnInit{

  started: boolean;
  minutes: number;
  seconds: number;
  newMin: any;
  interval: any;

  constructor() {
  }

  ngOnInit(): void {
    this.minutes = 25
    this.seconds = 0
  }

  resetVariables(mins, secs, started) {
    this.minutes = mins
    this.seconds = secs
    this.started = started
  }

  start() {
    this.newMin = setInterval(() => {
      this.intervalCallback()
    }, 1000)
  }

  addFive() {
    this.minutes = this.minutes + 5
    console.log(this.minutes)
  }

  minusFive() {
    this.minutes = this.minutes - 5
  }


  stop() {
    clearInterval(this.newMin);
    this.resetVariables(this.minutes, this.seconds, false)
  }

  intervalCallback() {
      this.seconds++
      if (this.seconds === 60) {
        this.minutes++
        this.seconds = 0
      }
  }

}
