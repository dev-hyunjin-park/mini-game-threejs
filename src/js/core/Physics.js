import * as THREE from "three";
import * as CANNON from "cannon-es";

export class Physics extends CANNON.World {
  clock = new THREE.Clock();

  constructor() {
    super();

    this.gravity = new CANNON.Vec3(0, -9.82, 0);
    this.broadphase = new CANNON.SAPBroadphase(this);
    this.allowSleep = true;
    // 움직이지 않는 물체는 자동적으로 잠자기 상태로 들어감 -> 물리 계산에서 제외됨 -> 퍼포먼스 향상
  }

  add(...bodies) {
    bodies.forEach((body) => this.addBody(body));
  }

  update(...models) {
    const deltaTime = this.clock.getDelta();
    this.step(1 / 60, deltaTime);

    models.forEach((model) => {
      if (model.body) {
        model.position.copy(model.body.position);
        model.quaternion.copy(model.body.quaternion);
      }
    });
  }
}

export const SPhysics = new Physics();
