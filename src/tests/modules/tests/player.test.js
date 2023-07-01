import { Gameboard } from '../gameboard';
import { Player } from '../player';
import { Ship } from '../ship';

describe('player', () => {
  let player;
  let gameboard;
  let ship;

  beforeEach(() => {
    player = Player();
    gameboard = Gameboard();
    ship = Ship(3);
  });

  test('attacks', () => {
    gameboard.placeShip(ship, [0, 0], true);
    player.attack(gameboard, [0, 0]);
    player.attack(gameboard, [0, 1]);
    player.attack(gameboard, [0, 2]);

    expect(gameboard.gameOver).toBe(true);
  });

  test('random attacks', () => {
    gameboard.placeRandomShips();
    for (let i = 0; i < 100; i++) {
      player.randomAttack(gameboard);
    }
    expect(gameboard.gameOver).toBe(true);
  });
});
