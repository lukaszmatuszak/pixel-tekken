import Sprite from '../Sprite/Sprite';
import { IPosition } from '../../interfaces/IPosition';

interface ICharacterConstructor {
    height: number;
    width: number;
    position: IPosition;
    velocity: IPosition;
    offset: IPosition;
    scale: number;
    framesMax: number;
    imageSrc: string;
}

class Character extends Sprite {
  protected _velocity: IPosition;
  protected _height: number;
  protected _width: number;
  private _gravity: number;

  constructor(props: ICharacterConstructor) {
    const {
      height, width, position, velocity, offset, scale, framesMax, imageSrc,
    } = props;
    super({
      position,
      imageSrc,
      framesMax,
      scale,
      offset,
    });
    this._gravity = 0.4;
    this._height = height;
    this._width = width;
    this._velocity = velocity;
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
  }
}

export default Character;
