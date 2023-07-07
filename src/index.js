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
  resetBoard,
  loadRandomShips,
  startGame,
  player,
  checkButton,
  restartButton,
  hit,
} from './tests/dom/dom-control';
import { Gameboard } from './tests/modules/factories/gameboard.js';
import { Player } from './tests/modules/factories/player';
import { Ship } from './tests/modules/factories/ship';

// const gameboard = Gameboard();
// const player = Player('player');
// const ai = Player('ai');
// const ship = Ship(3);
// const ship1 = Ship(2);

// gameboard.placeRandomShips();
// console.table(gameboard.board);

loadBoards();
const cells = document.querySelectorAll('#grid-player .cell');
const ships = document.querySelectorAll('.ship');
const mousePos = { x: null, y: null };
const playerGrid = document.querySelector('#grid-player');
const resetButton = document.querySelector('#reset-button');
const randomButton = document.querySelector('#random-button');
const startButton = document.querySelector('#start-button');
const aiCells = document.querySelectorAll('#grid-computer .cell');

window.addEventListener('mousemove', (e) => {
  mousePos.x = e.clientX;
  mousePos.y = e.clientY;
  // console.log('mouePos', mousePos);
});

cells.forEach((cell) => {
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

playerGrid.addEventListener('drag', (e) => e.preventDefault());

resetButton.addEventListener('click', resetBoard);
randomButton.addEventListener('click', loadRandomShips);
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', () => location.reload());
aiCells.forEach((cell) => cell.addEventListener('click', hit));

const port = document.querySelector('.port');
const observerPort = new MutationObserver(() => {
  const cells = document.querySelectorAll('#grid-player .cell');
  const ships = document.querySelectorAll('.ship');
  const docks = document.querySelectorAll('.dock');
  docks.forEach((dock) => (dock.dataset.amount = `x${dock.childElementCount}`));

  cells.forEach((cell) => {
    console.log('mutation');
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
});

observerPort.observe(port, { childList: true, subtree: true });

const observerGrid = new MutationObserver(() => {
  console.log('observe');
  const startButton = document.querySelector('#start-button');
  if (player.gameboard.isShipsPlacedSuccessful()) {
    console.log('remove');
    startButton.classList.remove('disabled-button');
    return;
  }
  console.log('add');
  startButton.classList.add('disabled-button');
});

observerGrid.observe(playerGrid, { childList: true, subtree: true });

document.addEventListener('click', (e) => console.log(e.target));
