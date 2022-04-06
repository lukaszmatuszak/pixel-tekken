import Sprite from '../Sprite/Sprite';
import { IPosition } from '../../interfaces/IPosition';
import { IKeys } from '../../interfaces/IKeys';
import { ISpritesCollection } from '../../interfaces/ISpritesCollection';

interface IAttackBox {
  offset: IPosition,
  width: number,
  height: number
  position?: IPosition,
}
export interface ICharacterConstructor {
    height: number;
    width: number;
    position: IPosition;
    velocity: IPosition;
    offset: IPosition;
    scale: number;
    keys: IKeys;
    sprites: ISpritesCollection;
    attackBox: IAttackBox;
}

class Character extends Sprite {
  protected _velocity: IPosition;
  protected _height: number;
  protected _width: number;
  private _gravity: number; // global
  private _moveSpeed: number; // global
  private _jumpHeight: number; // global
  private _keys: IKeys;
  private _lastPressedKey: string;
  private _sprites: ISpritesCollection;
  private _health: number;
  private _attackBox: IAttackBox;

  constructor(props: ICharacterConstructor) {
    const {
      height, width, position, velocity, offset, scale, keys, sprites, attackBox
    } = props;
    super({
      position,
      imageSrc: sprites.idle.imageSrc,
      framesMax: sprites.idle.framesMax,
      scale,
      offset,
    });
    this._gravity = 0.4;
    this._moveSpeed = 5;
    this._jumpHeight = 15;
    this._health = 100;
    this._height = height;
    this._width = width;
    this._velocity = velocity;
    this._keys = keys;
    this._sprites = sprites;
    this._attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: attackBox.offset,
      height: attackBox.height,
      width: attackBox.width,
    };

    for (const key in this._sprites) {
        sprites[key as keyof ISpritesCollection].image = new Image();
        sprites[key as keyof ISpritesCollection].image.src = sprites[key as keyof ISpritesCollection].imageSrc;
    }

    this._setUpListeners();
  }

  update(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    this._animateFrames();

    // ctx.fillStyle = "blue";
    // ctx.fillRect(
    //   this.position.x,
    //   this.position.y,
    //   this._width,
    //   this._height,
    // );

    this._updateAttackBoxPosition(ctx);
    this._draw(ctx); 

    this.position.y += this._velocity.y;
    this.position.x += this._velocity.x;
    this._velocity.x = 0;

    if (this.position.y + this._height + this._velocity.y >= canvas.height - 96) {
      // prevent from falling
      this._velocity.y = 0;
    } else {
      // aplly gravity
      this._velocity.y += this._gravity;
    }

    // set default idle sprite
    if (!this._keys.left.pressed && !this._keys.right.pressed && this._velocity.y === 0) {
      this._switchSprite('idle');
    }

    this._handleMoveLeft();
    this._handleMoveRight(canvas);
    this._handleJump();
  }

  takeHit(): void {
    this._health -= 20;

    if (this._health <= 0) {
      this._switchSprite("death");
    } else {
      this._switchSprite("takeHit");
    }
  }

  _updateAttackBoxPosition(ctx: CanvasRenderingContext2D) {
    this._attackBox.position.x = this.position.x + this._attackBox.offset.x;
    this._attackBox.position.y = this.position.y + this._attackBox.offset.y;

    this._drawAttackBox(ctx);
  }

  private _drawAttackBox(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "yellow";
    ctx.fillRect(
      this._attackBox.position.x,
      this._attackBox.position.y,
      this._attackBox.width,
      this._attackBox.height
    );
  }

  private _handleMoveLeft(): void {
    if (
      this._keys.left.pressed
            && this._lastPressedKey === this._keys.left.key
            && this.position.x - this._moveSpeed >= 0
    ) {
      this._velocity.x = -this._moveSpeed;
      if (this._velocity.y !== 0) {
        return;
      }
      this._switchSprite('run');
    }
  }

  private _handleMoveRight(canvas: HTMLCanvasElement): void {
    if (
      this._keys.right.pressed
            && this._lastPressedKey === this._keys.right.key
            && this.position.x + this._width + this._moveSpeed <= canvas.width
    ) {
      this._velocity.x = this._moveSpeed;
      if (this._velocity.y !== 0) {
        return;
      }
      this._switchSprite('run');
    }
  }

  private _handleJump(): void {
    if (this._keys.jump.pressed && this._velocity.y === 0) {
      this._velocity.y = -this._jumpHeight;
    }

    if (this._velocity.y < 0) {
      this._switchSprite('jump');
    }

    if (this._velocity.y > 0) {
      this._switchSprite('fall');
    }
  }

  private _switchSprite(sprite: string): void {
    // override other animations (attack)
    if (this.image === this._sprites.attack.image && this.currentFrame < this._sprites.attack.framesMax - 1) {
      return;
    }

    // override other animations (take hit)
    if (this.image === this._sprites.takeHit.image && this.currentFrame < this._sprites.takeHit.framesMax - 1) {
      return;
    }

    switch (sprite) {
      case 'idle': {
        if (this.image === this._sprites.idle.image) {
          return;
        }
        this.image = this._sprites.idle.image;
        this.framesMax = this._sprites.idle.framesMax;
        this.currentFrame = 0;
        break;
      }
      case 'run': {
        if (this.image === this._sprites.run.image) {
          return;
        }
        this.image = this._sprites.run.image;
        this.framesMax = this._sprites.run.framesMax;
        this.currentFrame = 0;
        break;
      }
      case 'jump': {
        if (this.image === this._sprites.jump.image) {
          return;
        }
        this.image = this._sprites.jump.image;
        this.framesMax = this._sprites.jump.framesMax;
        this.currentFrame = 0;
        break;
      }
      case 'fall': {
        if (this.image === this._sprites.fall.image) {
          return;
        }
        this.image = this._sprites.fall.image;
        this.framesMax = this._sprites.fall.framesMax;
        this.currentFrame = 0;
        break;
      }
      case 'attack': {
        if (this.image === this._sprites.attack.image) {
          return;
        }
        this.image = this._sprites.attack.image;
        this.framesMax = this._sprites.attack.framesMax;
        this.currentFrame = 0;
        break;
      }
      case 'takeHit': {
        if (this.image === this._sprites.takeHit.image) {
          return;
        }
        this.image = this._sprites.takeHit.image;
        this.framesMax = this._sprites.takeHit.framesMax;
        this.currentFrame = 0;
        break;
      }
      case 'death': {
        if (this.image === this._sprites.death.image) {
          return;
        }
        this.image = this._sprites.death.image;
        this.framesMax = this._sprites.death.framesMax;
        this.currentFrame = 0;
        break;
      }
      default:
        break;
    }
  }

  private _setUpListeners(): void {
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      switch (event.key) {
        case this._keys.left.key: {
          this._lastPressedKey = event.key;
          this._keys.left.pressed = true;
          break;
        }
        case this._keys.right.key: {
          this._lastPressedKey = event.key;
          this._keys.right.pressed = true;
          break;
        }
        case this._keys.jump.key: {
          this._keys.jump.pressed = true;
          break;
        }
        case this._keys.attack.key: {
          if (!this._keys.attack.pressed) {
            this._switchSprite("attack");
            this._keys.attack.pressed = true;
          }
          break;
        }
        default:
          break;
      }
    });

    window.addEventListener('keyup', (event: KeyboardEvent) => {
      switch (event.key) {
        case this._keys.left.key: {
          this._keys.left.pressed = false;
          if (this._keys.right.pressed) {
            window.dispatchEvent(new KeyboardEvent('keydown', { key: this._keys.right.key }));
          }
          break;
        }
        case this._keys.right.key: {
          this._keys.right.pressed = false;
          if (this._keys.left.pressed) {
            window.dispatchEvent(new KeyboardEvent('keydown', { key: this._keys.left.key }));
          }
          break;
        }
        case this._keys.jump.key: {
          this._keys.jump.pressed = false;
          break;
        }
        default:
          break;
      }
    });
  }
}

export default Character;
