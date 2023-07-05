import './index.html';
import './scss/index.scss';
import {
  allowDrop,
  drag,
  dragEnd,
  drop,
  loadBoards,
  rotateShip,
  toggleHover,
} from './tests/dom/dom-control';
import { Gameboard } from './tests/modules/factories/gameboard.js';
import { Player } from './tests/modules/factories/player';
import { Ship } from './tests/modules/factories/ship';

// const gameboard = Gameboard();
// const player = Player('player');
// const ai = Player('ai');
// const ship = Ship(3);
// const ship1 = Ship(2);

loadBoards();
const cells = document.querySelectorAll('#grid-player .cell');
const ships = document.querySelectorAll('.ship');
const mousePos = { x: null, y: null };

window.addEventListener('mousemove', (e) => {
  mousePos.x = e.clientX;
  mousePos.y = e.clientY;
  // console.log('mouePos', mousePos);
});

cells.forEach((cell) => {
  cell.addEventListener('dragover', allowDrop);
  cell.addEventListener('dragover', allowDrop);
  cell.addEventListener('drop', drop);
  cell.addEventListener('dragenter', toggleHover);
  cell.addEventListener('dragleave', toggleHover);
});

ships.forEach((ship) => {
  ship.addEventListener('dragstart', drag);
  ship.addEventListener('dragend', dragEnd);
  ship.addEventListener('click', rotateShip);
});

const port = document.querySelector('.port');
const observer = new MutationObserver(() => {
  const docks = document.querySelectorAll('.dock');
  docks.forEach((dock) => (dock.dataset.amount = `x${dock.childElementCount}`));
});

observer.observe(port, { childList: true, subtree: true });
