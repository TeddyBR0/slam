import { BoxGeometry, MeshStandardMaterial, Mesh } from "three";

export class Vehicle {
  constructor(x, z, speed, direction, color) {
    this.x = x;
    this.z = z;
    this.speed = speed;
    this.direction = direction;

    const geo = new BoxGeometry(0.8, 0.3, 0.6);
    const mat = new MeshStandardMaterial({ color });
    this.mesh = new Mesh(geo, mat);
    this.mesh.position.set(x, 0.15, z);
    this.mesh.castShadow = true;
  }

  update(dt) {
    this.x += this.speed * this.direction * (dt / 1000);
    this.mesh.position.x = this.x;
  }
}
