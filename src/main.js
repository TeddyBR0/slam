import { scene, camera, renderer } from "./scene/setup.js";
import { createLights } from "./scene/lights.js";
import { Player } from "./entities/Player.js";
import { InputManager } from "./systems/InputManager.js";
import { CameraFollow } from "./systems/CameraFollow.js";
import { WorldGenerator } from "./systems/WorldGenerator.js";
import { TrafficSystem } from "./systems/TrafficSystem.js";
import { GameState } from "./systems/GameState.js";
import { CollisionSystem } from "./systems/CollisionSystem.js";

createLights(scene);

const world = new WorldGenerator(scene);
world.generate();

const traffic = new TrafficSystem(scene, world.lanes);

const player = new Player();
scene.add(player.mesh);

const input = new InputManager();
const cameraFollow = new CameraFollow(camera);
const gameState = new GameState();
const collision = new CollisionSystem(gameState);

let lastTime = performance.now();

function animate(time) {
  const dt = time - lastTime;
  lastTime = time;

  if (gameState.isPlaying) {
    const dir = input.consumeDirection();
    if (dir) {
      player.startHop(dir.x, dir.z);
    }
  }

  player.update(dt);
  traffic.update(dt);
  collision.check(player, traffic.vehicles);
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

function restart() {
  gameState.restart();
  player.reset();
  traffic.reset();
  cameraFollow.reset(player);
}

addEventListener("keydown", (e) => {
  if (e.code === "KeyR" && !gameState.isPlaying) {
    e.preventDefault();
    restart();
  }
});
