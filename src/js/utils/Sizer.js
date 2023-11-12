import { SEventEmitter } from "./EventEmitter";

export class Sizer {
  width_ = 0;
  get width() {
    // 바깥에서 width를 참조할 수 있게
    return this.width_;
  }

  height_ = 0;
  get height() {
    return this.height_;
  }

  constructor() {
    this.width_ = window.innerWidth;
    this.height_ = window.innerHeight;
    this.eventEmitter = SEventEmitter;

    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.width_ = window.innerWidth;
    this.height_ = window.innerHeight;
    this.eventEmitter.resize();
  }
}
