import { Ship } from './ship.js';

export function Gameboard() {
  const board = createBoard();
  const hits = new Set();
  let ships = 10;

  function createBoard() {
    let board = [];
    for (let i = 0; i < 10; i++) {
      board[i] = [];
      for (let k = 0; k < 10; k++) {
        board[i].push(0);
      }
    }
    return board;
  }

  return {
    ships,
    getRandomCoords() {
      return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    },
    getBoard() {
      return board;
    },
    placeShip(ship, coords, isHorizontal) {
      let newX = coords[0] - 1;
      let newY = coords[1] - 1;
      let count = 0;
      const areaLength = (ship.getLength() + 2) * 3;
      const shipEndX = coords[1] + ship.getLength();
      const shipEndY = coords[0] + ship.getLength();

      if (isHorizontal) {
        if (
          shipEndX > 9 ||
          board[coords[0]][shipEndX] !== 0 ||
          board[coords[0]][coords[1]] !== 0
        ) {
          console.log('You can`t place here');
          return false;
        }

        for (let i = 0; i < ship.getLength(); i++) {
          board[coords[0]][coords[1] + i] = ship;
        }

        for (let i = 0; i < areaLength; i++) {
          if (count > areaLength / 3 - 1) {
            count = 0;
            newX++;
            newY = coords[1] - 1;
          }
          try {
            if (board[newX][newY] === 0) {
              board[newX][newY] = -1;
            }
            newY++;
            count++;
          } catch (e) {
            newY++;
            count++;
            continue;
          }
        }
        return true;
      } else if (!isHorizontal) {
        if (
          shipEndY > 9 ||
          board[shipEndY][coords[1]] !== 0 ||
          board[coords[0]][coords[1]] !== 0
        ) {
          console.log('You can`t place here');
          return false;
        }
        for (let i = 0; i < ship.getLength(); i++) {
          board[coords[0] + i][coords[1]] = ship;
        }

        for (let i = 0; i < areaLength; i++) {
          if (count > areaLength / 3 - 1) {
            count = 0;
            newY++;
            newX = coords[0] - 1;
          }
          try {
            if (board[newX][newY] === 0) {
              board[newX][newY] = -1;
            }
            newX++;
            count++;
          } catch (e) {
            newX++;
            count++;
            continue;
          }
        }
        return true;
      }
    },

    receiveAttack(coords) {
      const [x, y] = coords;
      const cell = board[x][y];

      if (hits.has(`${x}, ${y}`)) {
        return console.log('choose another coordinates');
      }

      hits.add(`${x}, ${y}`);

      if (typeof board[x][y] === 'object') {
        board[x][y].hit();
        board[x][y] = 'x';

        if (cell.isSunk()) {
          ships--;
        }
      } else {
        board[x][y] = '*';
      }

      if (ships === 0) {
        alert('game over');
      }
    },
    placeRandomShip() {
      const lengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
      const ships = lengths.map((l) => Ship(l));

      let successfulPlacement = 0;

      while (successfulPlacement < lengths.length) {
        const coords = this.getRandomCoords();
        const isHorizontal = Math.random() < 0.5;

        if (this.placeShip(ships[successfulPlacement], coords, isHorizontal)) {
          successfulPlacement++;
        }
      }
    },
  };
}

console.log('fdg');
