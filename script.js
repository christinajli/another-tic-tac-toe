const RED_CLASS = 'red'
const BLUE_CLASS = 'blue'
const WINNING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
let redTurn
const pieceElements = document.querySelectorAll('.piece');
const cellElements = document.querySelectorAll('.cell');
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winning-message')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restart-button')

startGame()

restartButton.addEventListener('click', startGame)

// Loop through pieces and add listeners
for (const piece of pieceElements) {
  piece.addEventListener('dragstart', dragStart);
  piece.addEventListener('dragend', dragEnd);
}

// Loop through empty cells and add listeners
for (const cell of cellElements) {
  cell.addEventListener('dragover', dragOver);
  cell.addEventListener('dragenter', dragEnter);
  cell.addEventListener('dragleave', dragLeave);
  cell.addEventListener('drop', dragDrop);
}

function startGame() {
  redTurn = true
  //reset to initial board
  winningMessageElement.classList.remove('show')
}

// Reference on item being dragged
let dragged

// Drag functions for pieces
function dragStart(e) {
  dragged = e.target;
  e.target.classList.add('hold');
  e.target.classList.add('dragging');
}

function dragEnd(e) {
  e.target.classList.remove('hold');
  e.target.classList.remove('dragging');
}

// Drag functions for board
function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  if (e.target.classList.contains('dropAllowed')) {
    e.target.classList.add('hovering');
  }
}

function dragLeave(e) {
  if (e.target.classList.contains('dropAllowed')) {
    e.target.classList.remove('hovering');
  }
}

function dragDrop(e) {
  e.preventDefault();
  if (e.target.classList.contains('dropAllowed')) {
    e.target.classList.remove('hovering');
    e.target.classList.remove('dropAllowed');
    dragged.parentNode.removeChild(dragged);
    e.target.appendChild(dragged);
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${redTurn ? "Red" : "Blue"} Wins!`
  }
  winningMessageElement.classList.add('show')
}
