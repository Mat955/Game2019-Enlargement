'use strict';
var human = {
    score: 0,
    choice: ''
};
var computer = {
    score: 0,
    choice: ''
};
var params = {
    paper: document.querySelector("#paper"),
    rock: document.querySelector("#rock"),
    scissors: document.querySelector("#scissors"),
    output: document.querySelector("#output"),
    random: Math.floor(Math.random() * 3) + 1,
    score: document.querySelector("#score"),
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
    var closeButtons = document.querySelectorAll('.close');
    for (var i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener('click', closeModal);
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

newGame();

function newGame() {
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
        closeModal();
    });
}
//RESET GAME

function resetGame() {
    human.score = 0;
    computer.score = 0;
    params.score.innerHTML = human.score + ' - ' + computer.score;
    params.output.innerHTML = '';
    params.gameResult.innerHTML = '';
    params.eachRound = 0;
    for (var i = 0; i < params.circleButton.length; i++) {
        params.circleButton[i].classList.remove('circle');
    }
}

function computerMove() {
    var computerChoices = ['paper', 'rock', 'scissors'];
    var random = Math.floor(Math.random() * 3);
    return computerChoices[random];
}

function playerMove(humanChoice) {
    params.eachRound++;
    human.choice = humanChoice;
    computer.choice = computerMove();
    whoWins();
    endRound();
}


//PROCESS OF GAME

function whoWins() {
    if ((human.choice === 'rock' && computer.choice === 'paper') ||
        (human.choice === 'paper' && computer.choice === 'scissors') ||
        (human.choice === 'scissors' && computer.choice === 'rock')) {
        computer.score++;
        params.score.innerHTML = human.score + ' - ' + computer.score;
        addProgress('computer won');
        params.output.innerHTML = 'COMPUTER WON. You played ' + human.choice + ', computer played ' + computer.choice;
    } else if ((human.choice === 'rock' && computer.choice === 'scissors') ||
        (human.choice === 'scissors' && computer.choice === 'paper') ||
        (human.choice === 'paper' && computer.choice === 'rock')) {
        human.score++;
        params.score.innerHTML = human.score + ' - ' + computer.score;
        addProgress('you won');
        params.output.innerHTML = 'YOU WON. You played ' + human.choice + ', computer played ' + computer.choice;
    } else {
        params.output.innerHTML = 'DRAW. You played ' + human.choice + ', computer played ' + computer.choice;
        addProgress('draw');
    }
}

function addProgress(result) {
    params.progress.push({
        'round-nb': params.eachRound,
        'computer-move': computer.choice,
        'player-move': human.choice,
        'result': result
    });
}

//END ROUND

function endRound() {
    if (human.score === params.winner || computer.score === params.winner) {
        paramsWin();
        controllButtons(true);
        showModal();
        createModalTable();
    }
}

function paramsWin() {
    if (human.score === params.winner) {
        params.gameResult.innerHTML = '<span>GAME OVER  - you won</span>' + '<br>' + '<span>Play Again!</span>';
    } else if (computer.score === params.winner) {
        params.gameResult.innerHTML = '<span>GAME OVER - computer won</span>' + '<br>' + '<span>Play Again!</span>';
    }
}

/* SHOW MODAL */

function showModal() {
    var allModals = document.querySelectorAll('.modal');
    for (var i = 0; i < allModals.length; i++) {
        allModals[i].classList.remove('show');
    }
    document.querySelector('#modal-one').classList.add('show');
}

/* CLOSE MODAL */

function closeModal(event) {
    if (event) {
        event.preventDefault();
    }
    document.querySelector('#modal-one').classList.remove('show');
}

// MODAL TABLE

function createModalTable() {
    for (var j = 0; j < params.progress.length; j++) {
        params.gameResult.innerHTML += ' round number: ' + params.progress[j]['round-nb'] + ',   ';
        params.gameResult.innerHTML += ' your move: ' + params.progress[j]['player-move'] + ',  ';
        params.gameResult.innerHTML += ' computer move: ' + params.progress[j]['computer-move'] + ',  ';
        params.gameResult.innerHTML += ' result: ' + params.progress[j]['result'] + '<br>';
    }
}