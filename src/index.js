import './index.html';
import './scss/index.scss';
import { Gameboard } from './tests/modules/gameboard.js';
import { Player } from './tests/modules/player';

const gameboard = Gameboard();
const player = Player();
const ai = Player();
console.log(player);

// gameboard.placeRandomShips();
// console.log(gameboard.isShipsPlacedSuccessful());
// console.log(gameboard.receiveAttack([0, 0]));
// console.log(gameboard.receiveAttack([0, 0]));
// console.table(gameboard.getBoard());

player.gameboard.placeRandomShips();
ai.gameboard.placeRandomShips();

// console.table(player.gameboard.getBoard());
// console.table(ai.gameboard.getBoard());

// player.attack(ai.gameboard, [0, 0]);
// ai.randomAttack(player.gameboard);

// console.table(ai.gameboard.getBoard());
// console.table(player.gameboard.getBoard());

for (let i = 0; i < 100; i++) {
  ai.randomAttack(player.gameboard);
  console.log(player.gameboard.gameOver);
  if (player.gameboard.gameOver) {
    console.table(player.gameboard.getBoard());
    break;
  }
}

// while (player.gameboard.gameOver) {
//   console.log(player.gameboard.gameOver);
//   ai.randomAttack(player.gameboard);
// }

console.table(player.gameboard.getBoard());
console.log(player.gameboard.gameOver);
// console.table(player.gameboard.getBoard());
