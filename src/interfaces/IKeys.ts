interface IKey {
    pressed: boolean;
    key: string;
}

export interface IKeys {
    left: IKey;
    right: IKey;
    jump: IKey;
    attack: IKey;
}
