export default class Timer {
  seconds: number;
  minutes: number;
  hours: number;
  intervalId: undefined | ReturnType<typeof setTimeout>;

  constructor() {
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.intervalId;
    this.tick = this.tick.bind(this);
  }

  tick() {
    this.seconds += 1;
    if (this.seconds >= 60) {
      this.seconds = 0;
      this.minutes += 1;
    }

    if (this.minutes >= 60) {
      this.minutes = 0;
      this.hours += 1;
    }
  }

  render() {
    const timer = document.getElementById("total-timer");
    if (timer)
      timer.innerHTML = `${this.hours}:${this.minutes}:${this.seconds}`;
  }

  start() {
    this.intervalId = setInterval(() => {
      this.tick();
      this.render();
    }, 1000);
  }
}
