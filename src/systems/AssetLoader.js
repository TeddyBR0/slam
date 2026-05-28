import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const PATHS = {
  dog: "assets/models/player/kenney_cube-pets_1.0/Models/GLB format/animal-dog.glb",
  sedan: "assets/models/vehicles/kenney_car-kit/Models/GLB format/sedan-sports.glb",
  truck: "assets/models/vehicles/kenney_car-kit/Models/GLB format/truck.glb",
  van: "assets/models/vehicles/kenney_car-kit/Models/GLB format/van.glb",
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

  _load(path) {
    return new Promise((resolve, reject) => {
      this.loader.load(`/${path}`, (gltf) => resolve(gltf.scene), undefined, reject);
    });
  }
}
