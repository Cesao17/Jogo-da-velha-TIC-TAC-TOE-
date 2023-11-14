/*MODAL*/
const openModalButton = document.querySelector('#open-modal')
const closeModalButton = document.querySelector('#close-modal')
const modal = document.querySelector('#modal')
const fade = document.querySelector('#fade')
const player1Name = document.getElementById('player1') 
const player2Name = document.getElementById('player2') 
const Name1playerTela = document.querySelector('#nameP1')
const Name2playerTela = document.querySelector('#nameP2')
const spanVictoriP1 = document.querySelector('#spanVictoriP1');
const spanDefeatP1 = document.querySelector('#spanDefeatP1');
const spanVictoriP2 = document.querySelector('#spanVictoriP2');
const spanDefeatP2 = document.querySelector('#spanDefeatP2');


let winP1 = 0;
let defeatP1 = 0;

let winP2 = 0;
let defeatP2 = 0;


const toggleModal = () => {
    [modal, fade].forEach((el) => el.classList.toggle('hide'));
} 

[openModalButton, closeModalButton, fade].forEach(el => {
    el.addEventListener('click', () => toggleModal());
});

/*JOGO*/

/* Variaveis globais*/
const boardRigions = document.querySelectorAll('#gameBoard div');
let vBoard = [];
let trunPlayer = '';


function updateTitle() {
    const playerInput = document.getElementById(turnPlayer)
    document.getElementById('spanPlayerTurn').innerText = playerInput.value
}

function initializeGame() {
    vBoard = [['', '' ,''],['', '', ''],['', '', '']]
    turnPlayer = 'player1'
    document.querySelector('h1').innerHTML = 'Vez de: <span id="spanPlayerTurn"></span>'
    updateTitle()
    boardRigions.forEach(function (element) {
        element.classList.remove('win')
        element.innerText = ''
        element.classList.add('cursor-pointer')
        element.addEventListener('click', handleBoardClick)
    })
    spanVictoriP1.innerText = winP1
    spanDefeatP1.innerText = defeatP1
    spanVictoriP2.innerText = winP2
    spanDefeatP2.innerText = defeatP2
}

function attPlayerNames() {
    Name1playerTela.innerText = player1Name.value
    Name2playerTela.innerText = player2Name.value
}

function getWinRegions() {
    const winRegions = []
    if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
        winRegions.push("0.0", "0.1", "0.2")
    if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
        winRegions.push("1.0", "1.1", "1.2")
    if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
        winRegions.push("2.0", "2.1", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
        winRegions.push("0.0", "1.0", "2.0")
    if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
        winRegions.push("0.1", "1.1", "2.1")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
        winRegions.push("0.2", "1.2", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
        winRegions.push("0.0", "1.1", "2.2")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
        winRegions.push("0.2", "1.1", "2.0")
    return winRegions  
}

function disableRegion(element) {
    element.classList.remove('cursor-pointer')
    element.style.cursor = 'not-allowed'
    element.removeEventListener('click', handleBoardClick)
}

function disableStartButton(element) {
    element.classList.remove('cursor-pointer')
    element.style.cursor = 'not-allowed'
    openModalButton.disabled = true
}


function handleWin(regions) {
    regions.forEach(function (region) {
        document.querySelector('[data-region="' + region + '"]').classList.add('win')
    })
    const playerName = document.getElementById(turnPlayer).value
    document.querySelector('h1').innerHTML = playerName + ' VENCEU! 	&#128526'
    counter(turnPlayer)  
}

function counter(result) {
    if(result === 'player1') {
        winP1++
        defeatP2++
        spanVictoriP1.innerText = winP1
        spanDefeatP2.innerText = defeatP2
    } else{
        winP2++
        defeatP1++
        spanDefeatP1.innerText = defeatP1
        spanVictoriP2.innerText = winP2
    }
}


function handleBoardClick(ev) {
    const div = ev.currentTarget
    const region = div.dataset.region
    const rowColumnPair = region.split('.')
    const row = rowColumnPair[0]
    const column = rowColumnPair[1]
    if (turnPlayer === 'player1') {
        div.innerText = 'X'
        vBoard[row][column] = 'X'
    } else {
        div.innerText = 'O'
        vBoard[row][column] = 'O'
    }
    console.clear()
    console.table(vBoard)
    disableRegion(div)
    disableStartButton(openModalButton)
    const winRegions = getWinRegions()
    if (winRegions.length > 0) {
        handleWin(winRegions)
    } else if (vBoard.flat().includes('')){
        turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
        console.log(turnPlayer);
        updateTitle()
    } else {
        document.querySelector('h1').innerHTML = 'EMPATE!'
    }
}

document.getElementById('btn-start').addEventListener('click', function () {
    disableStartButton(openModalButton);
    initializeGame();
    toggleModal();
    attPlayerNames();
})