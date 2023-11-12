import { SWorld } from "../../core/World";
import { SPhysics } from "../../core/Physics";
import * as THREE from "three";
import { Floor } from "./models/Floor";
import { Light } from "./tools/Light";
import { Player } from "./models/Player";

// 월드 클래스를 관리하는 상위 계층의 클래스
export class Game {
  constructor() {
    this.world = SWorld;
    this.scene = new THREE.Scene();
    this.world.currentScene = this.scene;

    this.physics = SPhysics;

    this.addModels();
  }

  addModels() {
    this.player = new Player(0.3, { x: 0, y: 5, z: 0 });
    this.floor = new Floor(4, 1, 4, { x: 0, y: 0, z: 0 });
    this.light = new Light();

    this.scene.add(this.player, this.floor, this.light);
    this.physics.add(this.player.body, this.floor.body);
  }

  play() {
    this.world.update(); // 매 프레임마다 update한다
    this.physics.update(this.player, this.floor);

    window.requestAnimationFrame(() => {
      this.play();
    });
  }
}
