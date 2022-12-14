const RED_CLASS = 'red'
const BLUE_CLASS = 'blue'
const SMALL_CLASS = 'sm'
const MED_CLASS = 'med'
const LARGE_CLASS = 'lg'
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
const PIECE_SIZES = {
  lg: '144px',
  med: '114px',
  sm: '84px'
}

let redTurn
let currentClass
const pieceElements = document.querySelectorAll('.piece');
const cellElements = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const leftSide = document.getElementById('left-pieces');
const rightSide = document.getElementById('right-pieces');
const winningMessageElement = document.getElementById('winning-message');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', startGame);

startGame()

function startGame() {
  // Reset to initial board
  redTurn = true;
  currentClass = RED_CLASS;

  // Loop through pieces
  for (const piece of pieceElements) {
    // add listeners for pieces
    piece.addEventListener('dragstart', dragStart);
    piece.addEventListener('dragend', dragEnd);

    // separate red and blue pieces
    if (piece.classList.contains(RED_CLASS)) {
      piece.style.backgroundColor = 'red';
      piece.setAttribute('draggable', 'true');
      leftSide.appendChild(piece);
    }
    else if (piece.classList.contains(BLUE_CLASS)) {
      piece.style.backgroundColor = 'blue';
      piece.setAttribute('draggable', 'false');
      rightSide.appendChild(piece);
    }

    // set pieces size
    // TODO: more efficient way to set pieces size
    if (piece.classList.contains(SMALL_CLASS)) {
      piece.style.height = PIECE_SIZES.sm
      piece.style.width = PIECE_SIZES.sm
    }
    if (piece.classList.contains(MED_CLASS)) {
      piece.style.height = PIECE_SIZES.med
      piece.style.width = PIECE_SIZES.med
    }
    if (piece.classList.contains(LARGE_CLASS)) {
      piece.style.height = PIECE_SIZES.lg
      piece.style.width = PIECE_SIZES.lg
    }
  }

  // Loop through empty cells
  for (const cell of cellElements) {
    // remove previous tags
    cell.classList.remove(RED_CLASS);
    cell.classList.remove(BLUE_CLASS);
    cell.classList.add('dropAllowed');

    // add listeners for cells
    cell.addEventListener('dragover', dragOver);
    cell.addEventListener('dragenter', dragEnter);
    cell.addEventListener('dragleave', dragLeave);
    cell.addEventListener('drop', dragDrop);
  }
  winningMessageElement.classList.remove('show')
}

// Reference on item being dragged
let dragged

// Drag functions for pieces
function dragStart(e) {
  dragged = e.target;
  e.target.classList.add('dragging');
}

function dragEnd(e) {
  e.target.classList.remove('dragging');
}

// Drag functions for board
function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  if (e.target.classList.contains('dropAllowed') &&
    allowReplace(e.target.lastChild)) {
    e.target.classList.add(hoveringTag());
  }
}

function dragLeave(e) {
  if (e.target.classList.contains('dropAllowed')) {
    e.target.classList.remove(hoveringTag());
  }
}

function hoveringTag() {
  return redTurn ? 'red-hovering' : 'blue-hovering';
}

function dragDrop(e) {
  e.preventDefault();
  if (e.target.classList.contains('dropAllowed') &&
    allowReplace(e.target.lastChild))
  {
    e.target.classList.remove(hoveringTag());
    if (dragged.classList.contains(LARGE_CLASS)) {
      e.target.classList.remove('dropAllowed');
    }

    dragged.setAttribute('draggable', 'false');
    dragged.parentNode.removeChild(dragged);

    if (e.target.lastChild) {
      e.target.removeChild(e.target.lastChild);
    }
    e.target.appendChild(dragged);

    // After placing new piece check for win condition
    if (checkWin(currentClass)) {
      endGame(false);
    }
    // Check for draw condition
    else if (isDraw()) {
      endGame(true);
    }
    // Switch turns
    else {
      swapTurns();
    }
  }
}

// Helper functions for game
function allowReplace(child) {
  if (child) {
    var compare_small = child.classList.contains(SMALL_CLASS) &&
      (dragged.classList.contains(LARGE_CLASS) || dragged.classList.contains(MED_CLASS))

    var compare_med = child.classList.contains(MED_CLASS) &&
      dragged.classList.contains(LARGE_CLASS)

    return (compare_small || compare_med)
  }
  else {
    return true
  }
}

function swapTurns() {
  redTurn = !redTurn;
  currentClass = redTurn ? RED_CLASS : BLUE_CLASS;

  // Set current class as draggable
  for (const piece of pieceElements) {
    if (piece.classList.contains(currentClass)) {
      piece.setAttribute('draggable', 'true');
    }
    else {
      piece.setAttribute('draggable', 'false');
    }
  }
}

function checkWin(currentClass) {
  //at least one combination
  return WINNING_COMBINATION.some(combination => {
    //check for each winning combination
    return combination.every(index => {
      //if current class is in all three element in combination
      if (cellElements[index].lastChild) {
        return cellElements[index].lastChild.classList.contains(currentClass)
      }
      else {
        return false;
      }
    })
  })
}

function isDraw() {
  return !leftSide.childElementCount || !rightSide.childElementCount;
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${redTurn ? "Red" : "Blue"} Wins!`
  }
  winningMessageElement.classList.add('show')
}
