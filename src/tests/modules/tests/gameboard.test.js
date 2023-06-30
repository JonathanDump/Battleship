import { Gameboard } from '../gameboard';

describe('gameboard', () => {
  let gameboard;
  // let ship;

  beforeEach(() => {
    gameboard = Gameboard(); // Create a new instance of the Gameboard before each test
    // ship = { getLength: () => 3 };
  });

  it('create empty board', () => {
    const testBoard = [];
    for (let i = 0; i < 10; i++) {
      testBoard[i] = [];
      for (let k = 0; k < 10; k++) {
        testBoard[i].push(0);
      }
    }

    expect(gameboard.getBoard()).toEqual(testBoard);
  });

  it('place ship horizontally', () => {
    const coords = [0, 1];
    const direction = true;
    const ship = { getLength: () => 3 };
    const resBoard = [
      [-1, ship, ship, ship, -1, 0, 0, 0, 0, 0],
      [-1, -1, -1, -1, -1, -1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    gameboard.placeShip(ship, coords, direction);
    const testBoard = gameboard.getBoard();
    console.log(testBoard)
    expect(testBoard).toBe(resBoard);
  });
});
