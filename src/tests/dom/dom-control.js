import { Player } from '../modules/factories/player';
import { Ship } from '../modules/factories/ship';

const player = Player('player');
const ai = Player('ai');

export function loadBoards() {
  const grid = document.querySelector('#grid-player');
  const gridComputer = document.querySelector('#grid-computer');
  for (let i = 0; i < 10; i++) {
    for (let k = 0; k < 10; k++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.x = i;
      cell.dataset.y = k;

      const cell2 = document.createElement('div');
      cell2.classList.add('cell');
      cell2.dataset.x = i;
      cell2.dataset.y = k;

      grid.append(cell);
      gridComputer.append(cell2);
    }
  }
}

export function allowDrop(e) {
  e.preventDefault();
}

export function drag(e) {
  e.dataTransfer.setData('class', e.target.getAttribute('class'));
  e.dataTransfer.setData('length', e.target.getAttribute('data-length'));

  if (e.target.closest('.cell')) {
    console.log(e.target.getAttribute('data-length'));
    const coords = [
      +e.target.parentNode.dataset.x,
      +e.target.parentNode.dataset.y,
    ];
    // e.dataTransfer.setData('prevCoords', [
    //   +e.target.parentNode.dataset.x,
    //   +e.target.parentNode.dataset.y,
    // ]);
    player.gameboard.removeShip(coords);
    console.log(player.gameboard.board[2][0]);
    console.table(player.gameboard.board);
  }
}

export function drop(e) {
  let itemClass = e.dataTransfer.getData('class');
  const length = +e.dataTransfer.getData('length');
  const coords = [
    +e.target.getAttribute('data-x'),
    +e.target.getAttribute('data-y'),
  ];
  // const ship = document.querySelector(`.${itemClass}`);
  // console.log(ship);
  // const counter = ship.nextElementSibling;
  // console.log(
  //   e.dataTransfer
  //     .getData('prevCoords')
  //     .split(',')
  //     .array.forEach((n) => +n)
  // );

  if (player.gameboard.placeShip(Ship(length), coords, true)) {
    e.target.append(document.querySelector(`.${itemClass.replace(/ /g, '.')}`));

    console.log(player.gameboard.board);
    // console.log(counter);
  }
  toggleHover(e);
}

export function toggleHover(e) {
  e.target.classList.toggle('cell-hit');
}
