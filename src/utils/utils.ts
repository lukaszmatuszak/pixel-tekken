import Character from '../classes/Character/Character';

// fc: First character
// sc: Second character
export const collision = (fc: Character, sc: Character): boolean =>
  fc.attackBox.position.x + fc.attackBox.width >= sc.position.x
    && fc.attackBox.position.x <= sc.position.x + sc.width
    && fc.attackBox.position.y + fc.attackBox.height >= sc.position.y
    && fc.attackBox.position.y <= sc.position.y + sc.height;

export const determineWinner = (firstCharacterHP: number, secondCharacterHP: number): void => {
  const displayResultNode: HTMLElement = document.querySelector('#display-result');
  displayResultNode.style.display = 'flex';
  if (firstCharacterHP === secondCharacterHP) {
    displayResultNode.innerHTML = 'Tie';
    return;
  }

  if (firstCharacterHP > secondCharacterHP) {
    displayResultNode.innerHTML = 'Player One Wins';
  } else {
    displayResultNode.innerHTML = 'Player Two Wins';
  }
};
