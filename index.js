const cellEl = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const restartBtn = document.getElementById('restart-btn')

const winningMessageEl = document.getElementById('winning-message')
const winningMessageTextEl = document.querySelector('[data-winning-message-text]')

const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
]

const crossClass = 'cross'
const circleClass = 'circle'

let circleTurn

restartBtn.addEventListener('click',startGame)

startGame()

function startGame() {
    circleTurn = false
    cellEl.forEach(cell => {
        cell.classList.remove(crossClass)
        cell.classList.remove(circleClass)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click', handleClick, {once:true})
    })
    setBoardHoverClass()
    winningMessageEl.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? circleClass : crossClass

    placeMark(cell, currentClass)
    if (checkWin(currentClass)){
        endGame(false)
    } else if(isDraw()){
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(crossClass)
    board.classList.remove(circleClass)

    if(circleTurn){
        board.classList.add(circleClass)
    } else {
        board.classList.add(crossClass)
    }
}

function checkWin(currentClass){
    return winningCombos.some(combination => {
        return combination.every(index => {
            return cellEl[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw) {
    if (draw) {
        winningMessageTextEl.innerText = "Draw :("
    } else {
        winningMessageTextEl.innerText = `${circleTurn ? "O Wins!" : "X Wins!"}`
    }
    winningMessageEl.classList.add('show')
}

function isDraw(){
    return [...cellEl].every(cell => {
        return cell.classList.contains(crossClass) || cell.classList.contains(circleClass)
    })
    
}