import Sprite from '../Sprite/Sprite';
import Background from '../../assets/background.png';

class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  private _backgroundSprite: Sprite;

  constructor() {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = 1024;
    this.canvas.height = 576;

    this._backgroundSprite = new Sprite({ imageSrc: Background });
  }

  animate(): void {
    window.requestAnimationFrame(this.animate.bind(this));
    this._clearFrame();
    this._animateBackground();
  }

  _clearFrame(): void {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  _animateBackground(): void {
    this._backgroundSprite.update(this.ctx);
  }
}

const game: Game = new Game();

export default game;
