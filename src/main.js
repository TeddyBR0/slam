import { scene, camera, renderer } from "./scene/setup.js";
import { createLights } from "./scene/lights.js";
import { Player } from "./entities/Player.js";
import { InputManager } from "./systems/InputManager.js";
import { CameraFollow } from "./systems/CameraFollow.js";
import { WorldGenerator } from "./systems/WorldGenerator.js";
import { TrafficSystem } from "./systems/TrafficSystem.js";
import { GameState } from "./systems/GameState.js";
import { CollisionSystem } from "./systems/CollisionSystem.js";
import { AssetLoader } from "./systems/AssetLoader.js";
import { WorldDecorator } from "./systems/WorldDecorator.js";

let player;
let traffic;
let input;
let cameraFollow;
let gameState;
let collision;

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

function restart() {
  gameState.restart();
  player.reset();
  traffic.reset();
  cameraFollow.reset(player);
}

let lastTime;

async function init() {
  createLights(scene);

  const world = new WorldGenerator(scene);
  world.generate();

  const assetLoader = new AssetLoader();
  const [models, decorationModels] = await Promise.all([
    assetLoader.loadAll(),
    assetLoader.loadDecorations(),
  ]);

  const decorator = new WorldDecorator(scene, world.lanes, decorationModels);
  decorator.decorate();

  player = new Player(models.dog);
  scene.add(player.mesh);

  const vehicleModels = [models.sedan, models.truck, models.van];
  traffic = new TrafficSystem(scene, world.lanes, vehicleModels);

  input = new InputManager();
  cameraFollow = new CameraFollow(camera);
  gameState = new GameState();
  collision = new CollisionSystem(gameState);

  lastTime = performance.now();
  requestAnimationFrame(animate);
}

init();

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

addEventListener("keydown", (e) => {
  if (e.code === "KeyR" && gameState && !gameState.isPlaying) {
    e.preventDefault();
    restart();
  }
});
