interface IGame {
    animate: () => void;
}

class Game implements IGame {
  private _canvas: HTMLCanvasElement;

  private _ctx: CanvasRenderingContext2D;

  constructor() {
    this._canvas = document.querySelector('canvas');
    this._ctx = this._canvas.getContext('2d');

    this._canvas.width = 1024;
    this._canvas.height = 576;
  }

  animate(): void {
    window.requestAnimationFrame(this.animate.bind(this));

    this._ctx.fillStyle = 'black';
    this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
  }
}

export default Game;
