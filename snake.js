import { isEqualPosition, isOutsideGrid } from './lib.js';

export default class Snake {
  body = [{ x: 11, y: 11 }];
  isDead = false;
  #direction = { x: 0, y: 0 };
  #inputDirection = { x: 0, y: 0 };
  constructor() {
    this.#addListener();
  }
  move() {
    this.#direction = this.#inputDirection;
    const newHead = { x: this.body[0].x + this.#direction.x, y: this.body[0].y + this.#direction.y };

    if (isOutsideGrid(newHead) || this.body.slice(1).some(isEqualPosition(newHead))) this.isDead = true;
    this.body.unshift(newHead);
    this.body.pop();
  }
  draw(gameBoard) {
    this.body.forEach((segment) => {
      const snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart = segment.y;
      snakeElement.style.gridColumnStart = segment.x;
      snakeElement.classList.add('snake');
      gameBoard.appendChild(snakeElement);
    });
  }
  #addListener() {
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (this.#direction.y === 0) this.#inputDirection = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
          if (this.#direction.y === 0) this.#inputDirection = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
          if (this.#direction.x === 0) this.#inputDirection = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
          if (this.#direction.x === 0) this.#inputDirection = { x: 1, y: 0 };
          break;
      }
    });
  }
  eat(food) {
    const isEaten = this.body.some(isEqualPosition(food.position));
    if (isEaten) this.#expand(food.EXPANSION_RATE);
    return isEaten;
  }
  #expand(amount) {
    for (let i = 0; i < amount; i++) {
      this.body.push({ ...this.body[this.body.length - 1] });
    }
  }

  get head() {
    return this.body[0];
  }
}
