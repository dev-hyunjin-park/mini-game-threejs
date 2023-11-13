import * as THREE from "three";
import * as CANNON from "cannon-es";
import { SPhysics } from "../../../core/Physics";

export class Player extends THREE.Mesh {
  name = "player";
  body_ = null;

  get body() {
    return this.body_;
  }

  set body(body) {
    this.body_ = body;
  }

  constructor(radius, position) {
    const geometry = new THREE.SphereGeometry(radius, 30, 30);
    const material = new THREE.MeshStandardMaterial({ color: 0xcccccc });

    super(geometry, material);
    this.body = new PhysicsPlayer(radius, position);
    this.castShadow = true;
    this.receiveShadow = false;
  }
}

class PhysicsPlayer extends CANNON.Body {
  name = "player";

  constructor(radius, position) {
    const shape = new CANNON.Sphere(radius);
    const material = new CANNON.Material({
      friction: 0.1,
      restitution: 0.5,
    });
    super({ shape, material, mass: 10, position });
    this.physics = SPhysics;
    this.addKeydownEvent();
  }

  addKeydownEvent() {
    let isArrowUpPressed = false;
    let isArrowDownPressed = false;
    let isArrowLeftPressed = false;
    let isArrowRightPressed = false;
    let isSpacePressed = false;
    let isLanded = false;

    window.addEventListener("keydown", (event) => {
      if (event.code === "ArrowUp") isArrowUpPressed = true;
      if (event.code === "ArrowDown") isArrowDownPressed = true;
      if (event.code === "ArrowLeft") isArrowLeftPressed = true;
      if (event.code === "ArrowRight") isArrowRightPressed = true;
      if (event.code === "Space" && isLanded) isSpacePressed = true;
    });

    window.addEventListener("keyup", (event) => {
      if (event.code === "ArrowUp") isArrowUpPressed = false;
      if (event.code === "ArrowDown") isArrowDownPressed = false;
      if (event.code === "ArrowLeft") isArrowLeftPressed = false;
      if (event.code === "ArrowRight") isArrowRightPressed = false;
      if (event.code === "Space") isSpacePressed = false;
    });

    // 물리 시뮬레이션이 한 스텝 진행될 때마다 호출된다
    this.physics.addEventListener("postStep", () => {
      const x = isArrowLeftPressed ? -1 : isArrowRightPressed ? 1 : 0;
      const y = isSpacePressed && isLanded ? 40 : 0; // y값은 중력값에 영향을 받는다
      const z = isArrowUpPressed ? -1 : isArrowDownPressed ? 1 : 0;

      if (isSpacePressed) isLanded = false;

      this.applyImpulse(new CANNON.Vec3(x, y, z));
    });

    // 착지했을 때에만 (isLanded = true) 점프할 수 있게 한다
    this.addEventListener("collide", (event) => {
      if (event.body.name === "floor") {
        isLanded = true;
      }
    });
  }
}
