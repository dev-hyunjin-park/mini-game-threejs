import EventEmitter3 from "eventemitter3";

export class EventEmitter {
  eventEmitter = new EventEmitter3();

  resize() {
    this.eventEmitter.emit("resize"); // 이벤트 이름 방출
  }

  onResize(callbackFn) {
    this.eventEmitter.on("resize", callbackFn);
  }

  lose() {
    this.eventEmitter.emit("lose");
  }

  onLose(callbackFn) {
    this.eventEmitter.on("lose", callbackFn);
  }
}

export const SEventEmitter = new EventEmitter();
// S means 'Singleton' 하나의 객체만 만들어서 사용하겠다
