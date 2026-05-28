import { Vehicle } from "../entities/Vehicle.js";

const COLORS = [0xe74c3c, 0x3498db, 0xf39c12, 0x2ecc71, 0x9b59b6, 0x1abc9c];
const BOUNDARY = 8;
const SPAWN_X = 7;

export class TrafficSystem {
  constructor(scene, lanes) {
    this.scene = scene;
    this.vehicles = [];
    this.laneConfigs = [];

    for (const lane of lanes) {
      if (lane.type !== "road") continue;

      const dir = this.laneConfigs.length % 2 === 0 ? 1 : -1;
      const speed = 1.5 + Math.random() * 2;
      const spawnInterval = 2 + Math.random() * 2;

      this.laneConfigs.push({
        z: lane.z,
        direction: dir,
        speed,
        timer: Math.random() * 2,
        spawnInterval,
      });
    }

    this._spawnInitial();
  }

  _spawnInitial() {
    for (const cfg of this.laneConfigs) {
      const count = 1 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i++) {
        const x = cfg.direction === 1
          ? -SPAWN_X + i * 3
          : SPAWN_X - i * 3;
        this._spawnOne(x, cfg);
      }
    }
  }

  _spawnOne(x, cfg) {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const v = new Vehicle(x, cfg.z, cfg.speed, cfg.direction, color);
    this.scene.add(v.mesh);
    this.vehicles.push(v);
  }

  _canSpawn(z, direction) {
    const spawnX = direction === 1 ? -SPAWN_X : SPAWN_X;
    for (const v of this.vehicles) {
      if (v.z !== z) continue;
      if (Math.abs(v.x - spawnX) < 3) return false;
    }
    return true;
  }

  update(dt) {
    for (let i = this.vehicles.length - 1; i >= 0; i--) {
      const v = this.vehicles[i];
      v.update(dt);
      if (Math.abs(v.x) > BOUNDARY) {
        this.scene.remove(v.mesh);
        this.vehicles.splice(i, 1);
      }
    }

    for (const cfg of this.laneConfigs) {
      cfg.timer -= dt / 1000;
      if (cfg.timer <= 0 && this._canSpawn(cfg.z, cfg.direction)) {
        const x = cfg.direction === 1 ? -SPAWN_X : SPAWN_X;
        this._spawnOne(x, cfg);
        cfg.timer = cfg.spawnInterval;
      }
    }
  }
}
