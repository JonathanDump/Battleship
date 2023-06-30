import './index.html';
import './scss/index.scss';
import { Gameboard } from './tests/modules/gameboard';
import { Ship } from './tests/modules/ship';

const gameboard = Gameboard();
gameboard.placeShip(Ship(4), [0, 1], true);
console.log(gameboard.getBoard());

const ship = Ship(3);
ship.hit();
console.log(ship.getLength());
console.log(ship.hitCount);
