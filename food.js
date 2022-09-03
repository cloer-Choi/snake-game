import { isEqualPosition, randomPosision } from './lib.js';

export default class Food {
  position;
  EXPANSION_RATE = 1;
  constructor() {
    this.position = randomPosision();
  }
  update(exceptionPositions) {
    do {
      this.position = randomPosision();
    } while (exceptionPositions.some(isEqualPosition(this.position)));
  }
  draw(gameBoard) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = this.position.y;
    foodElement.style.gridColumnStart = this.position.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
  }
}
