import { PlaneGeometry, MeshStandardMaterial, Mesh, CanvasTexture } from "three";

function createGridTexture() {
  const size = 512;
  const cell = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  for (let x = 0; x < size; x += cell) {
    for (let y = 0; y < size; y += cell) {
      const row = Math.floor(y / cell);
      const col = Math.floor(x / cell);
      ctx.fillStyle = (row + col) % 2 === 0 ? "#6b8e23" : "#7cfc00";
      ctx.fillRect(x, y, cell, cell);
    }
  }

  return new CanvasTexture(canvas);
}

export function createGround(scene) {
  const geo = new PlaneGeometry(30, 30);
  const mat = new MeshStandardMaterial({
    map: createGridTexture(),
    roughness: 0.8,
  });
  const ground = new Mesh(geo, mat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);
}
