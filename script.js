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
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winning-message')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restart-button')

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    redTurn = true
    cellElements.forEach(cell => {
        cell.classList.remove(RED_CLASS)
        cell.classList.remove(BLUE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
    //reset to initial board
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = redTurn ? RED_CLASS : BLUE_CLASS

    //place item
    placeItem(cell, currentClass)
    //check for win condition
    if (checkWin(currentClass)) {
        endGame(false)
    }
    //check for draw condition
    else if (isDraw()){
        endGame(true)
    } 
    //switch turns
    else {
        swapTurns()
        setBoardHoverClass()
    }
}

function placeItem(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    redTurn = !redTurn
}

function setBoardHoverClass() {
    board.classList.remove(RED_CLASS)
    board.classList.remove(BLUE_CLASS)
    if (redTurn) {
        board.classList.add(RED_CLASS)
    } else {
        board.classList.add(BLUE_CLASS)
    }
}

function checkWin(currentClass) {
    //at least one combination
    return WINNING_COMBINATION.some(combination => {
        //check for each winning combination
        return combination.every(index => {
            //if current class is in all three element in combination
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${redTurn ? "Red" : "Blue"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    //every cell element is filled
    return [...cellElements].every(cell => {
        return cell.classList.contains(RED_CLASS) ||
               cell.classList.contains(BLUE_CLASS)
    })
}