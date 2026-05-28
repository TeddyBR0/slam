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
        Math.abs(px - v.x) < player.halfX + v.halfX &&
        Math.abs(pz - v.z) < player.halfZ + v.halfZ
      ) {
        this.gameState.die();
        return;
      }
    }
  }
}
