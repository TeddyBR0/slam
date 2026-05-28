import { Group, Box3 } from "three";

const HOP_DURATION = 200;
const HOP_HEIGHT = 0.3;

export class Player {
  constructor(model) {
    this.gridX = 0;
    this.gridZ = 0;
    this.isMoving = false;

    this._progress = 0;
    this._fromX = 0;
    this._fromZ = 0;
    this._dx = 0;
    this._dz = 0;

    this.mesh = new Group();

    const dog = model.clone(true);
    dog.scale.setScalar(0.6);
    dog.rotation.y = Math.PI;
    dog.castShadow = true;
    this.mesh.add(dog);

    const box = new Box3().setFromObject(this.mesh);
    this.halfX = (box.max.x - box.min.x) / 2;
    this.halfZ = (box.max.z - box.min.z) / 2;

    this.mesh.position.set(0, 0, 0);
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
    const y = HOP_HEIGHT * Math.sin(t * Math.PI);

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
    this.mesh.position.set(0, 0, 0);
  }

  get worldX() {
    return this.mesh.position.x;
  }

  get worldZ() {
    return this.mesh.position.z;
  }
}
