import Character from '../Character/Character';
import Idle from '../../assets/mack/Idle.png';

class Mack extends Character {
  constructor() {
    super({
      imageSrc: Idle,
      framesMax: 8,
      scale: 2.5,
      offset: { x: 215, y: 157 },
      height: 150,
      width: 50,
      position: { x: 100, y: 0 },
      velocity: { x: 0, y: 0 },
    });
  }
}

export default Mack;
