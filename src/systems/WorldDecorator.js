import { PlaneGeometry, MeshStandardMaterial, Mesh } from "three";

const LANE_HALF = 8;
const CLEAR_RADIUS = 1.2;

const NATURE_WEIGHTS = [
  { key: "trees", weight: 0.4 },
  { key: "bushes", weight: 0.25 },
  { key: "rocks", weight: 0.15 },
  { key: "flowers", weight: 0.1 },
  { key: "grassModels", weight: 0.1 },
];

export class WorldDecorator {
  constructor(scene, lanes, models) {
    this.scene = scene;
    this.lanes = lanes;
    this.models = models;
    this._placed = [];
  }

  decorate() {
    for (const lane of this.lanes) {
      if (lane.type === "grass") {
        this._decorateGrass(lane);
      } else {
        this._decorateRoad(lane);
      }
    }
    this._placeBuildings();
  }

  _pickWeighted() {
    const r = Math.random();
    let cumulative = 0;
    for (const { key, weight } of NATURE_WEIGHTS) {
      cumulative += weight;
      if (r < cumulative) {
        const arr = this.models[key];
        if (arr && arr.length) {
          return arr[Math.floor(Math.random() * arr.length)];
        }
      }
    }
    return null;
  }

  _decorateGrass(lane) {
    const count = 2 + Math.floor(Math.random() * 4);
    for (let i = 0; i < count; i++) {
      let x;
      let attempts = 0;
      do {
        x = (Math.random() - 0.5) * (LANE_HALF * 2 - 1);
        attempts++;
      } while (Math.abs(x) < CLEAR_RADIUS && attempts < 10);

      if (Math.abs(x) < CLEAR_RADIUS) continue;

      const z = lane.z + (Math.random() - 0.5) * 0.7;

      const tooClose = this._placed.some(
        (p) => Math.hypot(p.x - x, p.z - z) < 1.2
      );
      if (tooClose) continue;

      const model = this._pickWeighted();
      if (!model) continue;

      const mesh = model.clone(true);
      const scale = 0.8 + Math.random() * 0.4;
      mesh.scale.setScalar(scale);
      mesh.rotation.y = Math.random() * Math.PI * 2;
      mesh.position.set(x, 0, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.scene.add(mesh);
      this._placed.push({ x, z });
    }
  }

  _decorateRoad(lane) {
    const dashLen = 0.35;
    const gap = 0.4;
    const step = dashLen + gap;
    const mat = new MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 });

    for (let x = -LANE_HALF + 1; x < LANE_HALF - 0.5; x += step) {
      const geo = new PlaneGeometry(dashLen, 0.04);
      const dash = new Mesh(geo, mat);
      dash.rotation.x = -Math.PI / 2;
      dash.position.set(x, 0.01, lane.z);
      this.scene.add(dash);
    }
  }

  _placeBuildings() {
    const { buildings } = this.models;
    if (!buildings || !buildings.length) return;

    for (const lane of this.lanes) {
      const z = lane.z + (Math.random() - 0.5) * 0.4;
      for (const side of [-1, 1]) {
        const x = side * (LANE_HALF + 1.5 + Math.random() * 2);
        const model = buildings[Math.floor(Math.random() * buildings.length)];
        const mesh = model.clone(true);
        const scale = 0.8 + Math.random() * 0.4;
        mesh.scale.setScalar(scale);
        mesh.position.set(x, 0, z);
        mesh.rotation.y = side > 0 ? Math.PI / 2 : -Math.PI / 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.scene.add(mesh);
      }
    }
  }
}
