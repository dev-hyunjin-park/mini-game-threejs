import * as THREE from "three";
import * as CANNON from "cannon-es";
import gasp from "gsap";

export class Barricade extends THREE.Mesh {
  name = "barricade";
  body_ = null;

  get body() {
    return this.body_;
  }
  set body(body) {
    this.body_ = body;
  }

  constructor(width, height, depth, position) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshBasicMaterial({ color: 0x964b00 });

    super(geometry, material);
    this.receiveShadow = false;
    this.castShadow = true;
    this.body = new PhysicsBarricade(width, height, depth, position);
  }
}

export class PhysicsBarricade extends CANNON.Body {
  name = "barricade";
  originX = 0;

  constructor(width, height, depth, position) {
    const duration = Math.random() * 2 + 0.5; // random 속도
    const shape = new CANNON.Box(
      new CANNON.Vec3(
        // 공과 충돌했을 때 공이 파묻히는 현상을 일시적으로 해결하기 위해 +@
        width / 2 + (0.2 / duration) * (width / 2),
        height / 2,
        depth / 2
      )
    );
    const material = new CANNON.Material();

    super({ shape, material, mass: 0, position });

    this.originX = position.x;
    this.update(duration);
  }

  update(duration) {
    this.anime = gasp.to(this.position, {
      duration,
      x: -this.originX, // 바리케이드 초기 x값만큼만 이동
      ease: "power1.inOut",
      yoyo: true, // 초기 상태로 돌아옴
      repeat: -1, // infinite
    });
  }

  reset() {
    this.anime.kill();
  }
}
