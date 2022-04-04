import Sprite from '../Sprite/Sprite';
import Background from '../../assets/background.png';
import Shop from '../../assets/shop.png';

class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  private _backgroundSprite: Sprite;
  private _shopSprite: Sprite;

  constructor() {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = 1024;
    this.canvas.height = 576;

    this._backgroundSprite = new Sprite({ imageSrc: Background });
    this._shopSprite = new Sprite({
      position: {
        x: 620,
        y: 128,
      },
      imageSrc: Shop,
      scale: 2.75,
      framesMax: 6,
    });
  }

  animate(): void {
    window.requestAnimationFrame(this.animate.bind(this));
    this._clearFrame();
    this._renderBackground();
    this._renderShop();
  }

  _clearFrame(): void {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.imageSmoothingQuality = 'high';
  }

  _renderBackground(): void {
    this._backgroundSprite.update(this.ctx);
  }

  _renderShop(): void {
    this._shopSprite.update(this.ctx);
  }
}

const game: Game = new Game();

export default game;
