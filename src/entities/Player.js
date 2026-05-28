import { BoxGeometry, MeshStandardMaterial, Mesh } from "three";

const HOP_DURATION = 200;
const HOP_HEIGHT = 0.3;

export class Player {
  constructor() {
    this.gridX = 0;
    this.gridZ = 0;
    this.isMoving = false;

    this._progress = 0;
    this._fromX = 0;
    this._fromZ = 0;
    this._dx = 0;
    this._dz = 0;

    const geo = new BoxGeometry(0.8, 0.8, 0.8);
    const mat = new MeshStandardMaterial({ color: 0x44aaff });
    this.mesh = new Mesh(geo, mat);
    this.mesh.castShadow = true;
    this.mesh.position.set(0, 0.4, 0);
  }

  startHop(dx, dz) {
    if (this.isMoving) return;
    this.isMoving = true;
    this._progress = 0;
    this._fromX = this.gridX;
    this._fromZ = this.gridZ;
    this._dx = dx;
    this._dz = dz;
    this.gridX += dx;
    this.gridZ += dz;
  }

  update(dt) {
    if (!this.isMoving) return;

    this._progress += dt / HOP_DURATION;

    if (this._progress >= 1) {
      this._progress = 1;
      this.isMoving = false;
    }

    const t = this._progress;
    const s = t * t * (3 - 2 * t);
    const x = this._fromX + this._dx * s;
    const z = this._fromZ + this._dz * s;
    const y = 0.4 + HOP_HEIGHT * Math.sin(t * Math.PI);

    this.mesh.position.set(x, y, z);
  }

  reset() {
    this.gridX = 0;
    this.gridZ = 0;
    this.isMoving = false;
    this._progress = 0;
    this._fromX = 0;
    this._fromZ = 0;
    this._dx = 0;
    this._dz = 0;
    this.mesh.position.set(0, 0.4, 0);
  }

  get worldX() {
    return this.mesh.position.x;
  }

  get worldZ() {
    return this.mesh.position.z;
  }
}
