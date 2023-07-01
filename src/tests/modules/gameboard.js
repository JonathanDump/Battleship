import { Ship } from './ship.js';

export function Gameboard() {
  const SIZE = 10;
  const board = createBoard();
  let gameOver = false;
  let ships = 0;

  function createBoard() {
    let board = [];
    for (let i = 0; i < SIZE; i++) {
      board[i] = [];
      for (let k = 0; k < SIZE; k++) {
        board[i].push(0);
      }
    }
    return board;
  }

  return {
    ships,
    gameOver,
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
          this.ships++;
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
          this.ships++;
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
        this.gameOver = true;
        // alert('game over');
        return true;
      }
    },
    placeRandomShips() {
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
    isShipsPlacedSuccessful() {
      let count = 0;

      for (let i = 0; i < SIZE; i++) {
        for (let k = 0; k < SIZE; k++) {
          if (typeof board[i][k] !== 'object') {
            count++;
          }
        }
      }

      return count === 80 ? true : false;
    },
  };
}

console.log('fdg');
