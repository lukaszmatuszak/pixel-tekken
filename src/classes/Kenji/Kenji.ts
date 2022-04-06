import Character, { ICharacterConstructor } from '../Character/Character';
import Idle from '../../assets/kenji/Idle.png';
import Run from '../../assets/kenji/Run.png';
import Jump from '../../assets/kenji/Jump.png';
import Fall from '../../assets/kenji/Fall.png';
import Attack from '../../assets/kenji/Attack1.png';
import TakeHit from '../../assets/kenji/Take hit.png';
import Death from '../../assets/kenji/Death.png';

const initConfig: ICharacterConstructor = {
  scale: 2.5,
  offset: { x: 215, y: 177 },
  height: 145,
  width: 60,
  position: { x: 850, y: 335 },
  velocity: { x: 0, y: 0 },
  keys: {
    left: {
      key: 'ArrowLeft',
      pressed: false,
    },
    right: {
      key: 'ArrowRight',
      pressed: false,
    },
    jump: {
      key: 'ArrowUp',
      pressed: false,
    },
    attack: {
      key: 'ArrowDown',
      pressed: false,
    },
  },
  sprites: {
    idle: { imageSrc: Idle, framesMax: 4 },
    run: { imageSrc: Run, framesMax: 8 },
    jump: { imageSrc: Jump, framesMax: 2 },
    fall: { imageSrc: Fall, framesMax: 2 },
    attack: { imageSrc: Attack, framesMax: 4 },
    takeHit: { imageSrc: TakeHit, framesMax: 3 },
    death: { imageSrc: Death, framesMax: 7 },
  },
  attackBox: {
    offset: {
      x: -172,
      y: -5,
    },
    width: 205,
    height: 150,
  },
};

class Kenji extends Character {
  constructor() {
    super(initConfig);
  }
}

export default Kenji;
