import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const BASE = "assets/models";

const PATHS = {
  dog: `${BASE}/player/kenney_cube-pets_1.0/Models/GLB format/animal-dog.glb`,
  sedan: `${BASE}/vehicles/kenney_car-kit/Models/GLB format/sedan-sports.glb`,
  truck: `${BASE}/vehicles/kenney_car-kit/Models/GLB format/truck.glb`,
  van: `${BASE}/vehicles/kenney_car-kit/Models/GLB format/van.glb`,
};

const NATURE = `${BASE}/nature/kenney_nature-kit/Models/GLTF format`;

const DECORATION_PATHS = {
  trees: [
    `${NATURE}/tree_default.glb`,
    `${NATURE}/tree_pineRoundA.glb`,
    `${NATURE}/tree_oak.glb`,
  ],
  bushes: [
    `${NATURE}/plant_bush.glb`,
    `${NATURE}/plant_bushSmall.glb`,
  ],
  rocks: [
    `${NATURE}/rock_smallA.glb`,
    `${NATURE}/rock_largeA.glb`,
  ],
  flowers: [
    `${NATURE}/flower_redA.glb`,
    `${NATURE}/flower_yellowA.glb`,
  ],
  grassModels: [
    `${NATURE}/grass.glb`,
  ],
  buildings: [
    `${BASE}/buildings/kenney_city-kit-commercial_2.1/Models/GLB format/low-detail-building-a.glb`,
    `${BASE}/buildings/kenney_city-kit-commercial_2.1/Models/GLB format/low-detail-building-b.glb`,
    `${BASE}/buildings/kenney_city-kit-commercial_2.1/Models/GLB format/low-detail-building-c.glb`,
    `${BASE}/buildings/kenney_city-kit-commercial_2.1/Models/GLB format/low-detail-building-d.glb`,
  ],
};

export class AssetLoader {
  constructor() {
    this.loader = new GLTFLoader();
  }

  loadAll() {
    const entries = Object.entries(PATHS).map(([key, path]) => {
      return this._load(path).then((scene) => [key, scene]);
    });
    return Promise.all(entries).then((results) => Object.fromEntries(results));
  }

  loadDecorations() {
    const groups = Object.entries(DECORATION_PATHS).map(([group, paths]) => {
      const promises = paths.map((path) => this._load(path));
      return Promise.all(promises).then((scenes) => [group, scenes]);
    });
    return Promise.all(groups).then((results) => Object.fromEntries(results));
  }

  _load(path) {
    return new Promise((resolve, reject) => {
      this.loader.load(`/${path}`, (gltf) => resolve(gltf.scene), undefined, reject);
    });
  }
}
