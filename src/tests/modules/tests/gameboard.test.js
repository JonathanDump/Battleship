import { Gameboard } from '../gameboard';
import { Ship } from '../ship';

describe('gameboard', () => {
  let gameboard;
  let ship;
  const coords = [0, 1];
  const direction = true;

  beforeEach(() => {
    gameboard = Gameboard(); // Create a new instance of the Gameboard before each test
    ship = Ship(3);
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

    const resBoard = [
      [-1, ship, ship, ship, -1, 0, 0, 0, 0, 0],
      [-1, -1, -1, -1, -1, 0, 0, 0, 0, 0],
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
    console.log(testBoard);
    expect(testBoard).toEqual(resBoard);
  });

  it('ship gets a hit', () => {
    gameboard.placeShip(ship, coords, direction);
    gameboard.receiveAttack(coords);
    const resBoard =[ [-1, 'x', ship, ship, -1, 0, 0, 0, 0, 0],
      [-1, -1, -1, -1, -1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    expect(ship.hitCount).toEqual(1);
    expect(gameboard.getBoard()).toEqual(resBoard);
  });
});
