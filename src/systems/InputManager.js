const KEY_MAP = {
  ArrowUp:    { x:  0, z: -1 },
  ArrowDown:  { x:  0, z:  1 },
  ArrowLeft:  { x: -1, z:  0 },
  ArrowRight: { x:  1, z:  0 },
  KeyW: { x:  0, z: -1 },
  KeyS: { x:  0, z:  1 },
  KeyA: { x: -1, z:  0 },
  KeyD: { x:  1, z:  0 },
};

export class InputManager {
  constructor() {
    this._direction = null;

    this._onKeyDown = (e) => {
      const dir = KEY_MAP[e.code];
      if (dir) {
        e.preventDefault();
        this._direction = dir;
      }
    };

    addEventListener("keydown", this._onKeyDown);
  }

  consumeDirection() {
    const dir = this._direction;
    this._direction = null;
    return dir;
  }

  dispose() {
    removeEventListener("keydown", this._onKeyDown);
  }
}
