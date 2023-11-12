import * as THREE from "three";

export class Renderer extends THREE.WebGLRenderer {
  get sizer() {
    return this.world.sizer;
  }
  get camera() {
    return this.world.camera;
  }
  get currentScene() {
    return this.world.currentScene;
  }

  constructor(world) {
    super({ alpha: true, antialias: true, canvas: world.domElement });

    this.world = world;
    this.setClearColor(0x333333, 1); // 캔버스 바탕화면
    this.setSize(this.sizer.width, this.sizer.height);
    this.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  resize() {
    this.setSize(this.sizer.width, this.sizer.height);
    this.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  update() {
    if (this.currentScene && this.camera) {
      this.render(this.currentScene, this.camera);
    }
  }
}