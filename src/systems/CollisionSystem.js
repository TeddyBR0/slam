const P_HALF = { x: 0.4, z: 0.4 };
const V_HALF = { x: 0.4, z: 0.3 };

export class CollisionSystem {
  constructor(gameState) {
    this.gameState = gameState;
  }

  check(player, vehicles) {
    if (!this.gameState.isPlaying) return;

    const px = player.mesh.position.x;
    const pz = player.mesh.position.z;

    for (const v of vehicles) {
      if (
        Math.abs(px - v.x) < P_HALF.x + V_HALF.x &&
        Math.abs(pz - v.z) < P_HALF.z + V_HALF.z
      ) {
        this.gameState.die();
        return;
      }
    }
  }
}
