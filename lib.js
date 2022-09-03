const GRID_SIZE = 21;
export const isEqualPosition = (position1) => (position2) => position1.x === position2.x && position1.y === position2.y;
export const randomPosision = () => ({ x: Math.floor(Math.random() * GRID_SIZE) + 1, y: Math.floor(Math.random() * GRID_SIZE) + 1 });
export const isOutsideGrid = (position) => position.x < 1 || position.x > GRID_SIZE || position.y < 1 || position.y > GRID_SIZE;
