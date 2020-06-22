export default class Speed {
  constructor() {
    this.time = Date.now();
    this.value = 0;
    this.speed = 0;
  }

  update(value) {
    let delta = value - this.value;
    this.value = value;
    let timeNow = Date.now();
    let dt = timeNow - this.time;
    this.time = timeNow;
    this.speed = delta * (1000 / dt);
  }

  reset() {
    this.time = Date.now();
    this.value = 0;
    this.speed = 0;
  }

  get() {
    return this.speed;
  }
}