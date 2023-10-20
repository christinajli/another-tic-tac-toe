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

let redTurn
let currentClass
const pieceElements = document.querySelectorAll('.piece');
const cellElements = document.querySelectorAll('.cell');
const boxElements = document.querySelectorAll('.dragbox');
const winningMessageElement = document.getElementById('winning-message');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', restartGame);

startGame()

function startGame() {
  // Reset to initial board
  redTurn = true;
  currentClass = RED_CLASS;

  // Loop through pieces
  for (piece of pieceElements) {
    // add listeners for pieces
    piece.addEventListener('dragstart', dragStart);
    piece.addEventListener('dragend', dragEnd);

    // separate red and blue pieces
    if (piece.classList.contains(RED_CLASS)) {
      piece.setAttribute('draggable', 'true');
      piece.style.cursor = 'grab';
    }
    else if (piece.classList.contains(BLUE_CLASS)) {
      piece.setAttribute('draggable', 'false');
      piece.style.cursor = 'default';
    }
  }

  // Loop through empty cells
  for (cell of cellElements) {
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
  e.target.style.cursor = 'grabbing';
  e.target.classList.add('dragging');
}

function dragEnd(e) {
  e.preventDefault();
  e.target.style.cursor = 'default';
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
  for (piece of pieceElements) {
    if (piece.classList.contains(currentClass)) {
      piece.style.cursor = 'grab';
      piece.setAttribute('draggable', 'true');
    }
    else {
      piece.style.cursor = 'default';
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
  let redPieces = [];
  let bluePieces = [];
  boxElements.forEach(box => {
    if(box.firstElementChild) {
      if(box.firstElementChild.classList.contains(RED_CLASS)) {
        redPieces.push(box.firstElementChild.classList);
      } else if (box.firstElementChild.classList.contains(BLUE_CLASS)) {
        bluePieces.push(box.firstElementChild.classList);
      }
    }
  })

  if (redPieces.length == 0 && bluePieces.length == 0) {
    return true;
  }
  if (redPieces.length == 0 && bluePieces.length == 1 && bluePieces[0].contains(SMALL_CLASS)) {
    return true;
  }
  if (bluePieces.length == 0 && redPieces.length == 1 && redPieces[0].contains(SMALL_CLASS)) {
    return true;
  }

  return false;
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${redTurn ? "Red" : "Blue"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

function restartGame() {
  location.reload();
}