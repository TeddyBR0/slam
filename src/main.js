import { scene, camera, renderer } from "./scene/setup.js";
import { createLights } from "./scene/lights.js";
import { createGround } from "./scene/ground.js";

createLights(scene);
createGround(scene);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
