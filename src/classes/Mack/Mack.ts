import Character, { ICharacterConstructor } from '../Character/Character';
import Idle from '../../assets/mack/Idle.png';
import Run from '../../assets/mack/Run.png';
import Jump from '../../assets/mack/Jump.png';
import Fall from '../../assets/mack/Fall.png';
import Attack from '../../assets/mack/Attack1.png';
import TakeHit from '../../assets/mack/Take Hit.png';
import Death from '../../assets/mack/Death.png';

const initConfig: ICharacterConstructor = {
  scale: 2.5,
  offset: { x: 215, y: 172 },
  height: 135,
  width: 70,
  position: { x: 100, y: 345 },
  velocity: { x: 0, y: 0 },
  keys: {
    left: {
      key: 'a',
      pressed: false,
    },
    right: {
      key: 'd',
      pressed: false,
    },
    jump: {
      key: 'w',
      pressed: false,
    },
    attack: {
      key: ' ',
      pressed: false,
    },
  },
  sprites: {
    idle: { imageSrc: Idle, framesMax: 8 },
    run: { imageSrc: Run, framesMax: 8 },
    jump: { imageSrc: Jump, framesMax: 2 },
    fall: { imageSrc: Fall, framesMax: 2 },
    attack: { imageSrc: Attack, framesMax: 6 },
    takeHit: { imageSrc: TakeHit, framesMax: 4 },
    death: { imageSrc: Death, framesMax: 6 },
  },
  attackBox: {
    offset: {
      x: 20,
      y: -35,
    },
    width: 235,
    height: 170,
  },
};

class Mack extends Character {
  constructor() {
    super(initConfig);
  }
}

export default Mack;
