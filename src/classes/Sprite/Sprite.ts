import { IPosition } from '../../interfaces/IPosition';

interface ISpriteConstructor {
    imageSrc: string;
    position?: IPosition;
    scale?: number;
    framesMax?: number;
    offset?: IPosition;
}

class Sprite {
  position: IPosition;
  image: HTMLImageElement;
  currentFrame: number;
  framesMax: number;
  private _scale: number;
  private _offset: IPosition;
  private _framesElapsed: number;
  private _framesHold: number;

  constructor(props: ISpriteConstructor) {
    const {
      imageSrc, position = { x: 0, y: 0 }, scale = 1, framesMax = 1, offset = { x: 0, y: 0 },
    } = props;
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
    this._scale = scale;
    this.framesMax = framesMax;
    this._offset = offset;
    this.currentFrame = 0;
    this._framesElapsed = 0;
    this._framesHold = 15;
  }

  update(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    this._animateFrames();
    this._draw(ctx);
  }

  protected _animateFrames(): void {
    this._framesElapsed += 1;
    if (this._framesElapsed % this._framesHold !== 0) {
      return;
    }

    if (this.currentFrame < this.framesMax - 1) {
      this.currentFrame += 1;
    } else {
      this.currentFrame = 0;
    }
  }

  protected _draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.image,
      this.currentFrame * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this._offset.x,
      this.position.y - this._offset.y,
      (this.image.width / this.framesMax) * this._scale,
      this.image.height * this._scale,
    );
  }
}

export default Sprite;
