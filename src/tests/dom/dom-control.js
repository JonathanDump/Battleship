import { Player } from '../modules/factories/player';
import { Ship } from '../modules/factories/ship';

const player = Player('player');
const ai = Player('ai');

const gridPlayer = document.querySelector('#grid-player');
const dataTransferStatic = {
  previousCoords: [NaN],
  length: 0,
  class: '',
};

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

  dataTransferStatic.class = e.target.getAttribute('class');
  dataTransferStatic.length = +e.target.getAttribute('data-length');

  if (e.target.closest('.cell')) {
    console.log(e.target.getAttribute('data-length'));
    const coords = [
      +e.target.parentNode.dataset.x,
      +e.target.parentNode.dataset.y,
    ];
    e.dataTransfer.setData('prevCoords', [
      e.target.parentNode.dataset.x,
      e.target.parentNode.dataset.y,
    ]);

    dataTransferStatic.previousCoords = [
      +e.target.parentNode.dataset.x,
      +e.target.parentNode.dataset.y,
    ];

    player.gameboard.removeShip(coords);

    console.table(player.gameboard.board);
  }
}

export function drop(e) {
  toggleHover(e);

  let itemClass = dataTransferStatic.class;
  const length = dataTransferStatic.length;
  const coords = [
    +e.target.getAttribute('data-x'),
    +e.target.getAttribute('data-y'),
  ];

  if (
    e.target.classList.contains('ship') ||
    !player.gameboard.placeShip(Ship(length), coords, true)
  ) {
    if (!isNaN(dataTransferStatic.previousCoords[0])) {
      player.gameboard.placeShip(
        Ship(length),
        dataTransferStatic.previousCoords,
        true
      );
    }

    console.table(player.gameboard.board);
    return;
  }
  e.target.append(document.querySelector(`.${itemClass.replace(/ /g, '.')}`));
}

export function dragEnd(e) {
  const rect = gridPlayer.getBoundingClientRect();
  console.log(rect);
  const endX = rect.x + rect.width;
  const endY = rect.y + rect.height;

  if (
    e.clientX > endX ||
    e.clientX < rect.x ||
    e.clientY > endY ||
    e.clientY < rect.y
  ) {
    if (!isNaN(dataTransferStatic.previousCoords[0])) {
      console.log('placement');
      player.gameboard.placeShip(
        Ship(dataTransferStatic.length),
        dataTransferStatic.previousCoords,
        true
      );
    }
  }
  console.log(player.gameboard.board);
}

export function toggleHover(e) {
  if (e.target.classList.contains('cell')) {
    e.target.classList.toggle('cell-hit');
  }
}
