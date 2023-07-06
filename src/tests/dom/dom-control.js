import { Player } from '../modules/factories/player';
import { Ship } from '../modules/factories/ship';
import { portHTML } from './patterns';

const player = Player('player');
const ai = Player('ai');

const gridPlayer = document.querySelector('#grid-player');
const dataTransferStatic = {
  previousCoords: [NaN],
  length: 0,
  class: '',
  isHorizontal: true,
};

export function loadBoards() {
  const grid = document.querySelector('#grid-player');
  const gridComputer = document.querySelector('#grid-computer');
  grid.innerHTML = '';
  gridComputer.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    for (let k = 0; k < 10; k++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.x = i;
      cell.dataset.y = k;

      grid.append(cell);
      gridComputer.append(cell.cloneNode());
    }
  }
}

export function allowDrop(e) {
  e.preventDefault();
}

export function drag(e) {
  e.dataTransfer.setData('class', e.target.getAttribute('class'));
  e.dataTransfer.setData('length', e.target.getAttribute('data-length'));
  e.dataTransfer.setData('index', e.target.getAttribute('data-index'));
  e.dataTransfer.setData(
    'isHorizontal',
    e.target.getAttribute('data-isHorizontal')
  );

  dataTransferStatic.class = e.target.getAttribute('class');
  dataTransferStatic.length = +e.target.getAttribute('data-length');
  dataTransferStatic.isHorizontal = e.target.getAttribute('data-ishorizontal');
  console.log('drag', dataTransferStatic.isHorizontal);
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
  const itemIdex = e.dataTransfer.getData('index');
  const itemClass = dataTransferStatic.class;
  const length = dataTransferStatic.length;
  const coords = [
    +e.target.getAttribute('data-x'),
    +e.target.getAttribute('data-y'),
  ];
  const isHorizontal = dataTransferStatic.isHorizontal === 'true';
  console.log('drop', isHorizontal);
  if (
    e.target.classList.contains('ship') ||
    !player.gameboard.placeShip(Ship(length), coords, isHorizontal)
  ) {
    if (!isNaN(dataTransferStatic.previousCoords[0])) {
      player.gameboard.placeShip(
        Ship(length),
        dataTransferStatic.previousCoords,
        isHorizontal
      );
    }

    console.table(player.gameboard.board);
    return;
  }
  e.target.append(
    document.querySelector(
      `.${itemClass.replace(/ /g, '.')}[data-index='${itemIdex}']`
    )
  );
}

export function dragEnd(e) {
  const rect = gridPlayer.getBoundingClientRect();
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
      const isHorizontal = dataTransferStatic.isHorizontal === 'true';
      console.log('end', isHorizontal);
      player.gameboard.placeShip(
        Ship(dataTransferStatic.length),
        dataTransferStatic.previousCoords,
        isHorizontal
      );
    }
  }
  console.table(player.gameboard.board);
}

export function toggleHover(e) {
  if (e.target.classList.contains('cell')) {
    e.target.classList.toggle('cell-hit');
  }
}

export function rotateShip(e) {
  console.log('1');
  const length = +e.target.getAttribute('data-length');
  if (!e.target.closest('.cell') || length === 1) {
    console.log('2');
    return;
  }

  const coords = [
    +e.target.parentNode.dataset.x,
    +e.target.parentNode.dataset.y,
  ];
  player.gameboard.removeShip(coords);
  const isHorizontal = e.target.dataset.ishorizontal === 'true';
  const qwe = 1 === 2;
  console.log('sdf', qwe);
  console.table(player.gameboard.board);

  if (!player.gameboard.placeShip(Ship(length), coords, !isHorizontal)) {
    player.gameboard.placeShip(Ship(length), coords, isHorizontal);
    console.log(player.gameboard.board);
    return;
  }
  console.log(player.gameboard.board);
  e.target.dataset.ishorizontal = !isHorizontal;
}

function loadPort() {
  const port = document.querySelector('.port');

  port.innerHTML = '';
  port.innerHTML = portHTML;
}

export function resetBoard() {
  player.gameboard.clearBoard();
  loadBoards();
  loadPort();
}

export function loadRandomShips() {
  resetBoard();
  player.gameboard.placeRandomShips();
  console.table(player.gameboard.board);
  const board = player.gameboard.board;
  const cells = [...document.querySelectorAll('#grid-player .cell')];
  const prevShips = [];

  for (let i = 0; i < 10; i++) {
    for (let k = 0; k < 10; k++) {
      if (board[i][k] === 0) {
        continue;
      }

      const ship = board[i][k];
      if (prevShips.includes(ship)) {
        continue;
      }

      prevShips.push(ship);
      const cell = cells.find(
        (cell) => +cell.dataset.x === i && +cell.dataset.y === k
      );
      console.log(cell);

      const shipDOM = document.querySelector(
        `.d${ship.length}`
      ).firstElementChild;
      console.log('shipDom', shipDOM);
      shipDOM.dataset.ishorizontal = `${ship.isHorizontal}`;
      console.log('shipDom2', shipDOM);

      cell.appendChild(shipDOM);
    }
  }
}
