export interface ISpriteData {
    imageSrc: string;
    framesMax: number;
    image?: HTMLImageElement;
}

export type ISpritesCollection = {
    idle: ISpriteData;
    run: ISpriteData;
    jump: ISpriteData;
    fall: ISpriteData;
    attack: ISpriteData;
    takeHit: ISpriteData;
    death: ISpriteData;
}
