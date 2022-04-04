import Sprite from '../Sprite/Sprite';
import { IPosition } from '../../interfaces/IPosition';
import { IKeys } from '../../interfaces/IKeys';

export interface ICharacterConstructor {
    height: number;
    width: number;
    position: IPosition;
    velocity: IPosition;
    offset: IPosition;
    scale: number;
    framesMax: number;
    imageSrc: string;
    keys: IKeys;
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

  constructor(props: ICharacterConstructor) {
    const {
      height, width, position, velocity, offset, scale, framesMax, imageSrc, keys,
    } = props;
    super({
      position,
      imageSrc,
      framesMax,
      scale,
      offset,
    });
    this._gravity = 0.4;
    this._moveSpeed = 5;
    this._jumpHeight = 15;
    this._height = height;
    this._width = width;
    this._velocity = velocity;
    this._keys = keys;

    this._setUpListeners();
  }

  update(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    this._animateFrames();
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

    this._handleMoveLeft();
    this._handleMoveRight(canvas);
    this._handleJump();
  }

  private _handleMoveLeft(): void {
    if (
      this._keys.left.pressed
      && this._lastPressedKey === this._keys.left.key
      && this.position.x - this._moveSpeed >= 0
    ) {
      this._velocity.x = -this._moveSpeed;
    }
  }

  private _handleMoveRight(canvas: HTMLCanvasElement): void {
    if (
      this._keys.right.pressed
      && this._lastPressedKey === this._keys.right.key
      && this.position.x + this._width + this._moveSpeed <= canvas.width
    ) {
      this._velocity.x = this._moveSpeed;
    }
  }

  private _handleJump(): void {
    if (this._keys.jump.pressed && this._velocity.y === 0) {
      this._velocity.y = -this._jumpHeight;
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
            window.dispatchEvent(
              new KeyboardEvent('keydown', { key: this._keys.right.key }),
            );
          }
          break;
        }
        case this._keys.right.key: {
          this._keys.right.pressed = false;
          if (this._keys.left.pressed) {
            window.dispatchEvent(
              new KeyboardEvent('keydown', { key: this._keys.left.key }),
            );
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
