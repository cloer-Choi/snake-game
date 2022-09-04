import Snake from './snake.js';
import Food from './food.js';

class Game {
  #gameBoard;
  #gameSpeed;
  #lastRenderTime;
  #Snake;
  #Food;
  #snake;
  #food;
  constructor(Snake, Food) {
    this.#gameBoard = document.getElementById('game-board');
    this.#Snake = Snake;
    this.#Food = Food;
    this.#init();
  }
  #init() {
    this.#gameSpeed = 3.5;
    this.#lastRenderTime = 0;
    this.#snake = new this.#Snake();
    this.#food = new this.#Food();
    this.#draw();
    window.addEventListener(
      'keydown',
      (e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'ArrowLeft') game.#start();
      },
      { once: true }
    );
  }
  #start() {
    window.requestAnimationFrame(this.#main.bind(this));
  }
  #main(currentTime) {
    if (this.#isEnd) {
      if (confirm('You lost. Press OK to restart.')) this.#init(this.#Snake, this.#Food);
      return;
    }
    this.#start();
    const secondsSinceLastRender = (currentTime - this.#lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / this.#gameSpeed) return;
    this.#lastRenderTime = currentTime;

    console.log('render');
    this.#update();
    this.#draw();
  }

  get #isEnd() {
    return this.#snake.isDead;
  }
  get #level() {
    return parseInt(this.#snake.body.length / 5);
  }

  #update() {
    this.#snake.move();
    const levelBefore = this.#level;
    if (this.#snake.eat(this.#food)) {
      this.#food.update(this.#snake.body);
      const levelAfter = this.#level;
      if (levelBefore !== levelAfter) this.#gameSpeed += 0.6;
    }
  }
  #draw() {
    this.#gameBoard.innerHTML = '';
    this.#snake.draw(this.#gameBoard);
    this.#food.draw(this.#gameBoard);
  }
}

const game = new Game(Snake, Food);
