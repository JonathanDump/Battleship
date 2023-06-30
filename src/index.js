import './index.html';
import './scss/index.scss';
import { Gameboard } from './tests/modules/gameboard.js';

const gameboard = Gameboard();

gameboard.placeRandomShip();

console.table(gameboard.getBoard());
