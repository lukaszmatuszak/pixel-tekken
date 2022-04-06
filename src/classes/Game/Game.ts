import Sprite from '../Sprite/Sprite';
import Background from '../../assets/background.png';
import Shop from '../../assets/shop.png';
import Mack from '../Mack/Mack';
import Kenji from '../Kenji/Kenji';

class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  private _backgroundSprite: Sprite;
  private _shopSprite: Sprite;
  private _Mack: Mack;
  private _Kenji: Kenji;
  private _framesCount: number;

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

    this._Mack = new Mack();
    this._Kenji = new Kenji();
    this._framesCount = 0;
  }

  animate(): void {
    this._framesCount += 1;
    window.requestAnimationFrame(this.animate.bind(this));

    // slow down animation to find bugs
    if (this._framesCount % 5 !== 0) {
      return;
    }

    this._clearFrame();
    this._renderBackground();
    this._renderShop();
    this._renderCharacters();
  }

  _clearFrame(): void {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.imageSmoothingQuality = 'high';
  }

  _renderBackground(): void {
    this._backgroundSprite.update(this.ctx, this.canvas);
  }

  _renderShop(): void {
    this._shopSprite.update(this.ctx, this.canvas);
  }

  _renderCharacters(): void {
    this._Mack.update(this.ctx, this.canvas);
    this._Kenji.update(this.ctx, this.canvas);
  }
}

const game: Game = new Game();

export default game;
