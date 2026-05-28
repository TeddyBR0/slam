import { scene, camera, renderer } from "./scene/setup.js";
import { createLights } from "./scene/lights.js";
import { createGround } from "./scene/ground.js";
import { Player } from "./entities/Player.js";
import { InputManager } from "./systems/InputManager.js";
import { CameraFollow } from "./systems/CameraFollow.js";

createLights(scene);
createGround(scene);

const player = new Player();
scene.add(player.mesh);

const input = new InputManager();
const cameraFollow = new CameraFollow(camera);

let lastTime = performance.now();

function animate(time) {
  const dt = time - lastTime;
  lastTime = time;

  const dir = input.consumeDirection();
  if (dir) {
    player.startHop(dir.x, dir.z);
  }

  player.update(dt);
  cameraFollow.update(player);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
