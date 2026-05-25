import { AmbientLight, DirectionalLight } from "three";

export function createLights(scene) {
  const ambient = new AmbientLight(0xffffff, 0.6);
  scene.add(ambient);

  const sun = new DirectionalLight(0xffffff, 1.2);
  sun.position.set(10, 20, 5);
  sun.castShadow = true;
  scene.add(sun);
}
