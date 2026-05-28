import { Group, Box3 } from "three";

const SCALE = 0.55;

export class Vehicle {
  constructor(x, z, speed, direction, model) {
    this.x = x;
    this.z = z;
    this.speed = speed;
    this.direction = direction;

    this.mesh = new Group();

    const clone = model.clone(true);
    clone.scale.setScalar(SCALE);
    clone.rotation.y = direction === 1 ? Math.PI / 2 : -Math.PI / 2;
    clone.castShadow = true;
    this.mesh.add(clone);

    const box = new Box3().setFromObject(this.mesh);
    this.halfX = (box.max.x - box.min.x) / 2;
    this.halfZ = (box.max.z - box.min.z) / 2;

    this.mesh.position.set(x, 0, z);
  }

  update(dt) {
    this.x += this.speed * this.direction * (dt / 1000);
    this.mesh.position.x = this.x;
  }
}
