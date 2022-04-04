import { IPosition } from '../../interfaces/IPosition';

interface ISpriteConstructor {
    imageSrc: string;
    position?: IPosition;
    scale?: number;
    framesMax?: number;
    offset?: IPosition;
}

class Sprite {
  private _position: IPosition;
  private _image: HTMLImageElement;
  private _scale: number;
  private _framesMax: number;
  private _offset: IPosition;
  private _currentFrame: number;
  private _framesElapsed: number;
  private _framesHold: number;

  constructor(props: ISpriteConstructor) {
    const {
      imageSrc, position = { x: 0, y: 0 }, scale = 1, framesMax = 1, offset = { x: 0, y: 0 },
    } = props;
    this._position = position;
    this._image = new Image();
    this._image.src = imageSrc;
    this._scale = scale;
    this._framesMax = framesMax;
    this._offset = offset;
    this._currentFrame = 0;
    this._framesElapsed = 0;
    this._framesHold = 15;
  }

  update(ctx: CanvasRenderingContext2D): void {
    this._animateFrames();
    this._draw(ctx);
  }

  private _animateFrames(): void {
    this._framesElapsed += 1;
    if (this._framesElapsed % this._framesHold !== 0) {
      return;
    }

    if (this._currentFrame < this._framesMax - 1) {
      this._currentFrame += 1;
    } else {
      this._currentFrame = 0;
    }
  }

  private _draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this._image,
      this._currentFrame * (this._image.width / this._framesMax),
      0,
      this._image.width / this._framesMax,
      this._image.height,
      this._position.x - this._offset.x,
      this._position.y - this._offset.y,
      (this._image.width / this._framesMax) * this._scale,
      this._image.height * this._scale,
    );
  }
}

export default Sprite;
