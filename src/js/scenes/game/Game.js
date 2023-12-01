import { SWorld } from "../../core/World";
import { SPhysics } from "../../core/Physics";
import * as THREE from "three";
import { Floor } from "./models/Floor";
import { Light } from "./tools/Light";
import { Player } from "./models/Player";
import { Barricade } from "./models/Barricade";
import { Roller } from "./models/Roller";
import { Goal } from "./models/Goal";
import { Timer } from "./tools/Timer";
import { SEventEmitter } from "../../utils/EventEmitter";

// 월드 클래스를 관리하는 상위 계층의 클래스
export class Game {
  constructor() {
    this.timer = new Timer(3, document.querySelector(".time h1"));
    this.world = SWorld;
    this.scene = new THREE.Scene();
    this.world.currentScene = this.scene;

    this.physics = SPhysics;
    this.eventEmitter = SEventEmitter;

    this.addModels();
    this.eventEmitter.onLose(() => this.reset());
  }

  addModels() {
    this.player = new Player(0.3, { x: 0, y: 3, z: 9 });
    this.floor1 = new Floor(5, 1, 20, { x: 0, y: 0, z: 0 });
    this.floor2 = new Floor(5, 1, 15, { x: 0, y: 0, z: -20 });
    this.floor3 = new Floor(5, 1, 7, { x: 0, y: 0, z: -35 });
    this.barricade1 = new Barricade(1.5, 1.5, 0.5, { x: -1.5, y: 1.4, z: 3 });
    this.barricade2 = new Barricade(1.5, 1.5, 0.5, { x: 2, y: 1.4, z: -2 });
    this.roller = new Roller(0.3, 0.3, 4, { x: 0, y: 1, z: -17 });
    this.goal = new Goal(1, { x: 0, y: 1, z: -35 });
    this.light = new Light();

    this.scene.add(
      this.player,
      this.floor1,
      this.floor2,
      this.floor3,
      this.light,
      this.light.target,
      this.barricade1,
      this.barricade2,
      this.roller,
      this.goal
      // new THREE.CameraHelper(this.light.shadow.camera)
    );
    this.models = this.scene.children.filter((child) => child.isMesh);
    this.physics.add(
      ...this.models.map((model) => model.body).filter((v) => !!v)
    );
  }

  play() {
    this.timer.update();
    this.world.update(this.player); // 매 프레임마다 update한다
    this.light.update(this.world.camera);
    this.physics.update(...this.models);
    window.requestAnimationFrame(() => {
      this.play();
    });
  }

  reset() {
    this.timer.stop();
    this.models.forEach((model) => model.body.reset?.());
  }
}
