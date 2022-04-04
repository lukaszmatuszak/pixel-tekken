import Character, { ICharacterConstructor } from '../Character/Character';
import Idle from '../../assets/mack/Idle.png';

const initConfig: ICharacterConstructor = {
  imageSrc: Idle,
  framesMax: 8,
  scale: 2.5,
  offset: { x: 215, y: 157 },
  height: 150,
  width: 50,
  position: { x: 100, y: 0 },
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
};

class Mack extends Character {
  constructor() {
    super(initConfig);
  }
}

export default Mack;
