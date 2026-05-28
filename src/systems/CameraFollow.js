const OFFSET = { x: 12, y: 10, z: 12 };
const LERP = 0.08;

export class CameraFollow {
  constructor(camera) {
    this.camera = camera;
  }

  update(player) {
    const px = player.worldX;
    const pz = player.worldZ;

    const tx = px + OFFSET.x;
    const tz = pz + OFFSET.z;

    this.camera.position.x += (tx - this.camera.position.x) * LERP;
    this.camera.position.y += (OFFSET.y - this.camera.position.y) * LERP;
    this.camera.position.z += (tz - this.camera.position.z) * LERP;

    this.camera.lookAt(px, 0, pz);
  }
}
