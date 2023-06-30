import './index.html';
import './scss/index.scss';
import { Gameboard } from './tests/modules/gameboard';
import { Ship } from './tests/modules/ship';

const gameBoard = Gameboard();

// gameBoard.placeShip(Ship(4), [0, 1], true);
// console.log(gameBoard.getBoard());

const ship = Ship(3);

gameBoard.placeShip(ship, [0, 1], true);

gameBoard.receiveAttack([0, 1]);
console.log(gameBoard.getBoard());
console.log(ship.hitCount);
