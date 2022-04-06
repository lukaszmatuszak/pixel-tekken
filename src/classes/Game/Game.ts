import gsap from 'gsap';
import Sprite from '../Sprite/Sprite';
import Background from '../../assets/background.png';
import Shop from '../../assets/shop.png';
import Mack from '../Mack/Mack';
import Kenji from '../Kenji/Kenji';
import { determineWinner, collision } from '../../utils/utils';

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
    this._handleHitCollision();
    this._determineWinner();
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

  private _handleHitCollision(): void {
    this._handleMackAttackCollision();
    this._handleKenjiAttackCollision();
  }

  private _handleMackAttackCollision(): void {
    if (
      collision(this._Mack, this._Kenji)
            && this._Mack.keys.attack.pressed
            && this._Mack.currentFrame === 4
            && this._Kenji.framesElapsed % this._Kenji.framesHold === 0
            && this._Mack.image === this._Mack.sprites.attack.image
    ) {
      this._Kenji.takeHit();

      gsap.to('#player-two-healthbar', { width: `${this._Kenji.health}%` });
    }

    // Handle miss
    if (
      this._Mack.keys.attack.pressed
            && this._Mack.currentFrame === 4
            && this._Mack.framesElapsed % this._Mack.framesHold === 0
    ) {
      this._Mack.keys.attack.pressed = false;
    }
  }

  private _handleKenjiAttackCollision(): void {
    if (
      collision(this._Kenji, this._Mack)
            && this._Kenji.keys.attack.pressed
            && this._Kenji.currentFrame === 2
            && this._Mack.framesElapsed % this._Mack.framesHold === 0
            && this._Kenji.image === this._Kenji.sprites.attack.image
    ) {
      this._Mack.takeHit();
      gsap.to('#player-one-healthbar', { width: `${this._Mack.health}%` });
    }

    // Handle miss
    if (
      this._Kenji.keys.attack.pressed
            && this._Kenji.currentFrame === 2
            && this._Kenji.framesElapsed % this._Kenji.framesHold === 0
    ) {
      this._Kenji.keys.attack.pressed = false;
    }
  }

  private _determineWinner(): void {
    if (this._Mack.health <= 0 || this._Kenji.health <= 0) {
      determineWinner(this._Mack.health, this._Kenji.health);
    }
  }
}

const game: Game = new Game();

export default game;
