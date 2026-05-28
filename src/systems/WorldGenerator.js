import { Lane } from "../entities/Lane.js";

const PATTERN = [
  { z: 3, type: "grass" },
  { z: 2, type: "grass" },
  { z: 1, type: "grass" },
  { z: 0, type: "grass" },
  { z: -1, type: "road" },
  { z: -2, type: "grass" },
  { z: -3, type: "road" },
  { z: -4, type: "road" },
  { z: -5, type: "grass" },
  { z: -6, type: "grass" },
  { z: -7, type: "road" },
  { z: -8, type: "grass" },
  { z: -9, type: "road" },
  { z: -10, type: "road" },
  { z: -11, type: "grass" },
  { z: -12, type: "road" },
  { z: -13, type: "grass" },
  { z: -14, type: "grass" },
  { z: -15, type: "road" },
  { z: -16, type: "grass" },
];

export class WorldGenerator {
  constructor(scene) {
    this.scene = scene;
    this.lanes = [];
  }

  generate() {
    for (const { z, type } of PATTERN) {
      const lane = new Lane(z, type);
      this.scene.add(lane.mesh);
      this.lanes.push(lane);
    }
  }
}
