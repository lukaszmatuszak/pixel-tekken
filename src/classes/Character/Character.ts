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
  height: number;
  width: number;
  attackBox: IAttackBox;
  keys: IKeys;
  health: number;
  sprites: ISpritesCollection;
  protected _velocity: IPosition;
  private _gravity: number; // global
  private _moveSpeed: number; // global
  private _jumpHeight: number; // global
  private _lastPressedKey: string;
  private _dead: boolean;

  constructor(props: ICharacterConstructor) {
    const {
      height, width, position, velocity, offset, scale, keys, sprites, attackBox,
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
    this.health = 100;
    this.height = height;
    this.width = width;
    this._velocity = velocity;
    this.keys = keys;
    this.sprites = sprites;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: attackBox.offset,
      height: attackBox.height,
      width: attackBox.width,
    };
    this._dead = false;

    for (const key in this.sprites) {
      sprites[key as keyof ISpritesCollection].image = new Image();
      sprites[key as keyof ISpritesCollection].image.src =
     sprites[key as keyof ISpritesCollection].imageSrc;
    }

    this._setUpListeners();
  }

  update(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    this._animateFrames();
    this._updateAttackBoxPosition(ctx);
    this._draw(ctx);

    this.position.y += this._velocity.y;
    this.position.x += this._velocity.x;
    this._velocity.x = 0;

    if (this.position.y + this.height + this._velocity.y >= canvas.height - 96) {
      // prevent from falling
      this._velocity.y = 0;
    } else {
      // aplly gravity
      this._velocity.y += this._gravity;
    }

    if (this._dead) {
      return;
    }

    // set default idle sprite
    if (!this.keys.left.pressed && !this.keys.right.pressed && this._velocity.y === 0) {
      this._switchSprite('idle');
    }

    this._handleMoveLeft();
    this._handleMoveRight(canvas);
    this._handleJump();
  }

  takeHit(): void {
    this.health -= 20;

    if (this.health <= 0) {
      this._switchSprite('death');
    } else {
      this._switchSprite('takeHit');
    }
  }

  _updateAttackBoxPosition(ctx: CanvasRenderingContext2D): void {
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
  }

  private _handleMoveLeft(): void {
    if (
      this.keys.left.pressed
            && this._lastPressedKey === this.keys.left.key
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
      this.keys.right.pressed
            && this._lastPressedKey === this.keys.right.key
            && this.position.x + this.width + this._moveSpeed <= canvas.width
    ) {
      this._velocity.x = this._moveSpeed;
      if (this._velocity.y !== 0) {
        return;
      }
      this._switchSprite('run');
    }
  }

  private _handleJump(): void {
    if (this.keys.jump.pressed && this._velocity.y === 0) {
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
    // override other animations (death)
    if (this.image === this.sprites.death.image) {
      if (this.currentFrame === this.sprites.death.framesMax - 1) {
        this._dead = true;
      }
      return;
    }
    // override other animations (attack)
    if (this.image === this.sprites.attack.image
      && this.currentFrame < this.sprites.attack.framesMax - 1) {
      return;
    }

    // override other animations (take hit)
    if (this.image === this.sprites.takeHit.image
      && this.currentFrame < this.sprites.takeHit.framesMax - 1) {
      return;
    }

    switch (sprite) {
      case 'idle': {
        if (this.image === this.sprites.idle.image) {
          return;
        }
        this.image = this.sprites.idle.image;
        this.framesMax = this.sprites.idle.framesMax;
        this.currentFrame = 0;
        break;
      }
      case 'run': {
        if (this.image === this.sprites.run.image) {
          return;
        }
        this.image = this.sprites.run.image;
        this.framesMax = this.sprites.run.framesMax;
        this.currentFrame = 0;
        break;
      }
      case 'jump': {
        if (this.image === this.sprites.jump.image) {
          return;
        }
        this.image = this.sprites.jump.image;
        this.framesMax = this.sprites.jump.framesMax;
        this.currentFrame = 0;
        break;
      }
      case 'fall': {
        if (this.image === this.sprites.fall.image) {
          return;
        }
        this.image = this.sprites.fall.image;
        this.framesMax = this.sprites.fall.framesMax;
        this.currentFrame = 0;
        break;
      }
      case 'attack': {
        if (this.image === this.sprites.attack.image) {
          return;
        }
        this.image = this.sprites.attack.image;
        this.framesMax = this.sprites.attack.framesMax;
        this.currentFrame = 0;
        break;
      }
      case 'takeHit': {
        if (this.image === this.sprites.takeHit.image) {
          return;
        }
        this.image = this.sprites.takeHit.image;
        this.framesMax = this.sprites.takeHit.framesMax;
        this.currentFrame = 0;
        break;
      }
      case 'death': {
        if (this.image === this.sprites.death.image) {
          return;
        }
        this.image = this.sprites.death.image;
        this.framesMax = this.sprites.death.framesMax;
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
        case this.keys.left.key: {
          this._lastPressedKey = event.key;
          this.keys.left.pressed = true;
          break;
        }
        case this.keys.right.key: {
          this._lastPressedKey = event.key;
          this.keys.right.pressed = true;
          break;
        }
        case this.keys.jump.key: {
          this.keys.jump.pressed = true;
          break;
        }
        case this.keys.attack.key: {
          if (!this.keys.attack.pressed) {
            this._lastPressedKey = event.key;
            this._switchSprite('attack');
            this.keys.attack.pressed = true;
          }
          break;
        }
        default:
          break;
      }
    });

    window.addEventListener('keyup', (event: KeyboardEvent) => {
      switch (event.key) {
        case this.keys.left.key: {
          this.keys.left.pressed = false;
          if (this.keys.right.pressed) {
            window.dispatchEvent(new KeyboardEvent('keydown', { key: this.keys.right.key }));
          }
          break;
        }
        case this.keys.right.key: {
          this.keys.right.pressed = false;
          if (this.keys.left.pressed) {
            window.dispatchEvent(new KeyboardEvent('keydown', { key: this.keys.left.key }));
          }
          break;
        }
        case this.keys.jump.key: {
          this.keys.jump.pressed = false;
          break;
        }
        default:
          break;
      }
    });
  }
}

export default Character;
