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
  spriteOffset: IPosition;
  framesElapsed: number;
  framesHold: number;
  private _scale: number;

  constructor(props: ISpriteConstructor) {
    const {
      imageSrc, position = { x: 0, y: 0 }, scale = 1, framesMax = 1, offset = { x: 0, y: 0 },
    } = props;
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
    this._scale = scale;
    this.framesMax = framesMax;
    this.spriteOffset = offset;
    this.currentFrame = 0;
    this.framesElapsed = 0;
    this.framesHold = 15;
  }

  update(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    this._animateFrames();
    this._draw(ctx);
  }

  protected _animateFrames(): void {
    this.framesElapsed += 1;
    if (this.framesElapsed % this.framesHold !== 0) {
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
      this.position.x - this.spriteOffset.x,
      this.position.y - this.spriteOffset.y,
      (this.image.width / this.framesMax) * this._scale,
      this.image.height * this._scale,
    );
  }
}

export default Sprite;
