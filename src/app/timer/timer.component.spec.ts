import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TimerComponent } from './timer.component';

describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;
  let minutes: any;
  let seconds: any;
  let startButton: any;
  let stopButton: any;
  let resetButton: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
    minutes = fixture.debugElement.queryAll(By.css('#minutes'))[0].nativeElement;
    seconds = fixture.debugElement.queryAll(By.css('#seconds'))[0].nativeElement;
    startButton = fixture.debugElement.queryAll(By.css('#start'))[0].nativeElement;
    stopButton = fixture.debugElement.queryAll(By.css('#stop'))[0].nativeElement;
    resetButton = fixture.debugElement.queryAll(By.css('#reset'))[0].nativeElement;
    fixture.detectChanges();
  });

  it('time variables should be pre-assigned', () => {
    expect(component.minutes).toEqual(25);
    expect(component.seconds).toEqual(0);
    expect(component.started).toEqual(false);
  });

  it('check resetVariables', () => {
    component.resetVariables(30, 15, false);
    expect(component.minutes).toEqual(30);
    expect(component.seconds).toEqual(15);
    expect(component.started).toEqual(false);
  });

  it('check time edit functions', () => {
    component.addFive();
    expect(component.minutes).toEqual(25);
    component.minusFive();
    expect(component.minutes).toEqual(25);
    startButton.click();
    component.addFive();
    expect(component.minutes).toEqual(30);
    component.minusFive();
    expect(component.minutes).toEqual(25);
    stopButton.click();
  });

  it('check start and stop', fakeAsync(() => {
    startButton.click();
    expect(component.minutes).toEqual(25);
    expect(component.seconds).toEqual(0);
    expect(component.started).toEqual(true);
    tick(1000);
    stopButton.click();
    expect(component.minutes).toEqual(24);
    expect(component.seconds).toEqual(59);
    expect(component.started).toEqual(false);

    startButton.click();
    tick(1000);
    expect(component.minutes).toEqual(24);
    expect(component.seconds).toEqual(58);
    expect(component.started).toEqual(true);
    stopButton.click();
  }));

  it('check if minutes and seconds are double digit', () => {
    expect(minutes.innerHTML).toEqual('25');
    expect(seconds.innerHTML).toEqual('00');
  });
  it('check if regular timer is triggered', fakeAsync(() => {
    spyOn(component, 'intervalCallback');
    // To check whether timer is calling intervalCallback or not, we have to start
    // and stop the timer
    // start timer
    startButton.click();
    tick(1000);
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();
    // stop timer
    stopButton.click();
    fixture.whenStable().then(() => {
      expect(component.intervalCallback).toHaveBeenCalledTimes(2);
    });
  }));

  it('check multiple clicks on start button', () => {
    startButton.click();
    const intervalValue = component.interval;
    startButton.click();
    expect(component.interval).toEqual(intervalValue);
    stopButton.click();
  });

  it('check when timer reached 0000 timer should stop', fakeAsync(() => {
    startButton.click();
    component.minutes = 0;
    component.seconds = 0;
    fixture.detectChanges();
    tick(1000);
    fixture.whenStable().then(() => {
      expect(component.minutes).toEqual(0);
      expect(component.seconds).toEqual(0);
      expect(component.started).toEqual(false);
    });
  }));

  it('when timer reached to 0000 start and stop button should not do anything', fakeAsync(() => {
    startButton.click();
    component.minutes = 0;
    component.seconds = 0;
    fixture.detectChanges();
    tick(1000);
    startButton.click();
    expect(component.minutes).toEqual(0);
    expect(component.seconds).toEqual(0);
    expect(component.started).toEqual(false);
    stopButton.click();
    expect(component.minutes).toEqual(0);
    expect(component.seconds).toEqual(0);
    expect(component.started).toEqual(false);
  }));

  it('check when we click on -5 button and if it reached to 0000 it should stick to 0000 and stop the timer', fakeAsync(() => {
    startButton.click();
    component.minutes = 2;
    component.seconds = 0;
    component.minusFive();
    fixture.detectChanges();
    tick(1000);
    fixture.whenStable().then(() => {
      expect(component.minutes).toEqual(0);
      expect(component.seconds).toEqual(0);
      expect(component.started).toEqual(false);
    });
  }));

  it('check when timer ends and when Reset button clicked it should reset to 25', fakeAsync(() => {
    startButton.click();
    component.minutes = 0;
    component.seconds = 0;
    fixture.detectChanges();
    tick(1000);
    resetButton.click();
    fixture.whenStable().then(() => {
      expect(component.minutes).toEqual(25);
      expect(component.seconds).toEqual(0);
      expect(component.started).toEqual(false);
    });
  }));

  it('check when timer is turned on and clicked on reset it should reseted to 25 and timer should stoped as well', fakeAsync(() => {
    startButton.click();
    fixture.detectChanges();
    tick(1000);
    resetButton.click();
    fixture.whenStable().then(() => {
      expect(component.minutes).toEqual(25);
      expect(component.seconds).toEqual(0);
      expect(component.started).toEqual(false);
    });
  }));

  it('check when timer is stopped and clicked on reset it should reseted to 25', fakeAsync(() => {
    startButton.click();
    fixture.detectChanges();
    tick(1000);
    stopButton.click();
    resetButton.click();
    fixture.whenStable().then(() => {
      expect(component.minutes).toEqual(25);
      expect(component.seconds).toEqual(0);
      expect(component.started).toEqual(false);
    });
  }));

});
