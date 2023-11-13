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
    this.floor1 = new Floor(5, 1, 20, { x: 0, y: 0, z: 0 });
    this.floor2 = new Floor(5, 1, 15, { x: 0, y: 0, z: -20 });
    this.floor3 = new Floor(5, 1, 7, { x: 0, y: 0, z: -35 });
    this.light = new Light();

    this.scene.add(
      this.player,
      this.floor1,
      this.floor2,
      this.floor3,
      this.light,
      this.light.target,
      new THREE.CameraHelper(this.light.shadow.camera)
    );
    this.physics.add(
      this.player.body,
      this.floor1.body,
      this.floor2.body,
      this.floor3.body
    );
  }

  play() {
    this.world.update(this.player); // 매 프레임마다 update한다
    this.light.update(this.world.camera);
    this.physics.update(this.player, this.floor1, this.floor2, this.floor3);
    window.requestAnimationFrame(() => {
      this.play();
    });
  }
}
