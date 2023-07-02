import './index.html';
import './scss/index.scss';
import { Gameboard } from './tests/modules/factories/gameboard.js';
import { Player } from './tests/modules/factories/player';
import { Ship } from './tests/modules/factories/ship';

const gameboard = Gameboard();
const player = Player('player');
const ai = Player('ai');
const ship = Ship(3);
console.log(player);

// gameboard.placeRandomShips();
// console.log(gameboard.isShipsPlacedSuccessful());
// console.log(gameboard.receiveAttack([0, 0]));
// console.log(gameboard.receiveAttack([0, 0]));
// console.table(gameboard.getBoard());

// player.gameboard.placeShip(ship, [0, 0], true);
player.gameboard.placeRandomShips();
ai.gameboard.placeRandomShips();

// console.log(player.gameboard.ships);
// console.log(ai.gameboard.ships);

// console.table(player.gameboard.getBoard());
// console.table(ai.gameboard.getBoard());

// player.attack(ai.gameboard, [0, 0]);
// ai.randomAttack(player.gameboard);

// console.table(ai.gameboard.getBoard());
// console.table(player.gameboard.getBoard());

for (let i = 0; i < 200; i++) {
  ai.randomAttack(player.gameboard);
  // console.log('1');
  // console.log(player.gameboard.gameOver);
  player.randomAttack(ai.gameboard);

  if (player.gameboard.gameOver) {
    console.log(player.gameboard.ships);
    console.log(`${ai.name} is a winner`);
    console.table(player.gameboard.getBoard());
    console.table(ai.gameboard.getBoard());
    break;
  }
  if (ai.gameboard.gameOver) {
    console.log(ai.gameboard.ships);
    console.log(`${player.name} is a winner`);
    console.table(ai.gameboard.getBoard());
    console.table(player.gameboard.getBoard());
    break;
  }
}

// console.table(player.gameboard.getBoard());
// console.log(player.gameboard.gameOver);
// console.table(player.gameboard.getBoard());

const grid = document.querySelector('#grid-player');
const gridComputer = document.querySelector('#grid-computer');

for (let i = 0; i < 100; i++) {
  grid.innerHTML += `<div class="cell"></div>`;
  gridComputer.innerHTML += `<div class="cell"></div>`;
}
