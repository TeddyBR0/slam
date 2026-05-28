export class GameState {
  constructor() {
    this._playing = true;
    this._overlay = document.getElementById("overlay");
  }

  get isPlaying() {
    return this._playing;
  }

  die() {
    if (!this._playing) return;
    this._playing = false;
    this._overlay.classList.remove("hidden");
  }

  restart() {
    this._playing = true;
    this._overlay.classList.add("hidden");
  }
}
