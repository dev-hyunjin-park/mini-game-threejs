import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class Camera extends THREE.PerspectiveCamera {
  // -> Camera 클래스는 THREE.PerspectiveCamera의 하위 클래스가 된다

  get sizer() {
    return this.world.sizer;
  }

  constructor(world) {
    super(75, world.sizer.width / world.sizer.height, 0.1, 100);
    // Camera 클래스가 THREE.PerspectiveCamera 클래스를 상속받고있기 때문에
    // super('인자 전달') === THREE.PerspectiveCamera('인자 전달')과 동일
    this.world = world;
    this.domElement = this.world.domElement;
    this.position.set(0, 2, 5);

    this.addControls();
  }

  addControls() {
    this.controls = new OrbitControls(this, this.domElement);
    this.controls.enabled = true;
    this.controls.enableDamping = true;
  }

  resize() {
    this.aspect = this.world.sizer.width / this.sizer.height;
    this.updateProjectionMatrix();
  }

  update({ position }) {
    this.rotation.x = -0.6;
    // player의 위치에 따라 카메라 update
    this.position.set(position.x, position.y + 2, position.z + 2.3);
  }
}
