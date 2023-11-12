import { SWorld } from "../../core/World";
import * as THREE from "three";
import { Floor } from "./models/Floor";
import { Light } from "./tools/Light";

// 월드 클래스를 관리하는 상위 계층의 클래스
export class Game {
  constructor() {
    this.world = SWorld;
    this.scene = new THREE.Scene();
    this.world.currentScene = this.scene;

    this.addModels();
  }

  addModels() {
    this.floor = new Floor(4, 1, 4, { x: 0, y: 0, z: 0 });
    this.light = new Light();

    this.scene.add(this.floor, this.light);
  }

  play() {
    this.world.update(); // 매 프레임마다 update한다

    window.requestAnimationFrame(() => {
      this.play();
    });
  }
}
