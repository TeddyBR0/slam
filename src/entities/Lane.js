import { PlaneGeometry, MeshStandardMaterial, Mesh } from "three";

const WIDTH = 12;
const COLORS = {
  grass: 0x7ec850,
  road: 0x666666,
};

export class Lane {
  constructor(z, type) {
    this.z = z;
    this.type = type;

    const geo = new PlaneGeometry(WIDTH, 1);
    const mat = new MeshStandardMaterial({
      color: COLORS[type],
      roughness: 0.9,
    });
    this.mesh = new Mesh(geo, mat);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.position.set(0, 0, z);
    this.mesh.receiveShadow = true;
  }
}
