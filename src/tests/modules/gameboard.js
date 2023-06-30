export function Gameboard() {
  const board = createBoard();

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

  function getBoard() {
    return board;
  }

  return {
    getBoard,
    placeShip(ship, coords, isHorizontal) {
      let newX = coords[0] - 1;
      let newY = coords[1] - 1;
      let count = 0;
      const areaLength = (ship.getLength() + 2) * 3;

      if (isHorizontal) {
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
      } else if (!isHorizontal) {
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
      }
    },
  };
}
