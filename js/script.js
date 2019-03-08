'use strict';
var params = {
    paper: document.querySelector("#paper"),
    rock: document.querySelector("#rock"),
    scissors: document.querySelector("#scissors"),
    output: document.querySelector("#output"),
    random: Math.floor(Math.random() * 3) + 1,
    score: document.querySelector("#score"),
    humanScore: 0,
    computerScore: 0,
    game: document.querySelector("#new-game-button"),
    question: 10,
    roundNumber: document.querySelector("#r-number"),
    gameResult: document.querySelector("#g-result"),
    circleButton: document.querySelectorAll(".circle-btn"),
    progress: [],
    eachRound: 0,
    table: document.querySelector("table"),
};

//START GAME (registerAddEventListener)

initialize();

function initialize() {
    registListener();
    controllButtons(true);
}

function registListener() {
    var buttonList = document.querySelectorAll('.player-move');

    for (let i = 0; i < buttonList.length; i++) {
        const buttonName = buttonList[i].getAttribute('data-move');

        buttonList[i].addEventListener('click', function () {
            playerMove(buttonName);
        });
    }
}

function controllButtons(disable) {
    params.circleButton.forEach(function (currentElement) {
        if (disable) {
            currentElement.setAttribute('disabled', true);
            currentElement.classList.remove('circle');
        } else {
            currentElement.removeAttribute('disabled');
            currentElement.classList.add('circle');
        }
    });
}

//NEW GAME

params.game.addEventListener('click', function () {
    controllButtons(false);
    resetGame();
    params.question = window.prompt('How many round would you like to play?');
    if (isNaN(params.question) || params.question.length < 1) {
        params.roundNumber.innerHTML = 'Please, write a number';
    } else {
        params.winner = Math.floor(params.question * 50 / 100 + 1);
        params.roundNumber.innerHTML = 'Number of round: ' + params.question + '  -   you will be a winner if you win ' + params.winner + ' rounds';
    }
    hideModal();
});

//RESET GAME

function resetGame() {
    params.humanScore = 0;
    params.computerScore = 0;
    params.score.innerHTML = params.humanScore + ' - ' + params.computerScore;
    params.output.innerHTML = '';
    params.gameResult.innerHTML = '';
    params.eachRound = 0;
    for (var i = 0; i < params.circleButton.length; i++) {
        params.circleButton[i].classList.remove('circle');
    }
}

function computerMove() {
    var random = Math.floor(Math.random() * 3);
    var computerChoices = ['paper', 'rock', 'scissors'];
    return computerChoices[random];
}

//PROCESS OF GAME

function playerMove(name) {
    var computerM = computerMove();
    params.eachRound++;
    if ((name === 'rock' && computerM === 'paper') ||
        (name === 'paper' && computerM === 'scissors') ||
        (name === 'scissors' && computerM === 'rock')) {
        params.computerScore++;
        params.score.innerHTML = params.humanScore + ' - ' + params.computerScore;
        params.progress.push({
            'round-nb': params.eachRound,
            'computer-move': computerM,
            'player-move': name,
            'result': 'computer won',
        });
        params.output.innerHTML = 'COMPUTER WON. You played ' + name + ', computer played ' + computerM;
        endRound();
    } else if ((name === 'rock' && computerM === 'scissors') ||
        (name === 'scissors' && computerM === 'paper') ||
        (name === 'paper' && computerM === 'rock')) {
        params.humanScore++;
        params.score.innerHTML = params.humanScore + ' - ' + params.computerScore;
        params.progress.push({
            'round-nb': params.eachRound,
            'computer-move': computerM,
            'player-move': name,
            'result': 'you won',
        });
        params.output.innerHTML = 'YOU WON. You played ' + name + ', computer played ' + computerM;
        endRound();
    } else {
        params.output.innerHTML = 'DRAW. You played ' + name + ', computer played ' + computerM;
        params.progress.push({
            'round-nb': params.eachRound,
            'computer-move': computerM,
            'player-move': name,
            'result': 'draw',
        });
    }
}

//END ROUND

function endRound() {
    if (params.humanScore === params.winner || params.computerScore === params.winner) {
        paramsWin();
        controllButtons(true);
        showModal();
        createModalTable();
    }
}

function paramsWin() {
    if (params.humanScore === params.winner) {
        params.gameResult.innerHTML = '<span>GAME OVER  - you won</span>' + '<br>' + '<span>Play Again!</span>';
    } else if (params.computerScore === params.winner) {
        params.gameResult.innerHTML = '<span>GAME OVER - computer won</span>' + '<br>' + '<span>Play Again!</span>';
    }
}

// SHOW MODAL 

function showModal() {
    var allModals = document.querySelectorAll('.modal');
    for (var i = 0; i < allModals.length; i++) {
        allModals[i].classList.remove('show');
    }
    document.querySelector('#modal-one').classList.add('show');
}

//HIDE MODAL 

function hideModal(event) {
    if (event) {
        event.preventDefault();
    }
    document.querySelector('#modal-one').classList.remove('show');
}

function CloseModal() {
    var closeButtons = document.querySelectorAll('.close');
    for (var i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener('click', hideModal);
    }
}

CloseModal();


// MODAL TABLE

function createModalTable() {
    for (var j = 0; j < params.eachRound; j++) {
        params.gameResult.innerHTML += ' round number: ' + params.progress[j]['round-nb'] + ',   ';
        params.gameResult.innerHTML += ' your move: ' + params.progress[j]['player-move'] + ',  ';
        params.gameResult.innerHTML += ' computer move: ' + params.progress[j]['computer-move'] + ', ';
        params.gameResult.innerHTML += ' result: ' + params.progress[j]['result'] + '<br>';
    }
}