import * as THREE from "three";
import { Sizer } from "../utils/Sizer";
import { Camera } from "../utils/Camera";
import { Renderer } from "../utils/Renderer";
import { SEventEmitter } from "../utils/EventEmitter";

export class World {
  currentScene_ = null;
  get currentScene() {
    return this.currentScene_;
  }
  // setter 함수: 특정한 속성에 값이 변경될 때마다 함수를 실행
  set currentScene(scene) {
    this.currentScene_ = scene;
  }

  constructor(canvasEl) {
    this.domElement = canvasEl;
    this.eventEmitter = SEventEmitter;

    this.sizer = new Sizer();
    this.camera = new Camera(this);
    this.renderer = new Renderer(this);

    this.eventEmitter.onResize(() => this.resize());
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
  }
}

// world 클래슨 하나만 생성될 수 있게
export const SWorld = new World(document.querySelector("#canvas"));
