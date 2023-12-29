'use strict';
// Selecting the elements to manipulate using DOM
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
const playerOneScore = document.querySelector('#score--0');
const playeTwoScore = document.getElementById('score--1');
const oneCurrentScore = document.getElementById('current--0');
const twoCurrentScore = document.getElementById('current--1');
const hideDice = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHoldScore = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, gameOn;

// Initial game conditions
function initializeGame (){
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    gameOn = true;

    playerOneScore.textContent = 0;
    playeTwoScore.textContent = 0;
    oneCurrentScore.textContent = 0;
    twoCurrentScore.textContent = 0;

    hideDice.classList.add('hidden');
    playerOne.classList.remove('player--winner');
    playerTwo.classList.remove('player--winner');
    playerOne.classList.add('player--active');
    playerTwo.classList.remove('player--active');
}

initializeGame();

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerOne.classList.toggle('player--active');
    playerTwo.classList.toggle('player--active');
}

// Rolling dice functionality
btnRollDice.addEventListener('click', function () {
    //Generate a random dice roll
    if (gameOn) {
        const diceFaceNum = Math.floor(Math.random() * 6) + 1;
        console.log(diceFaceNum);
        //Display the dice generated
        hideDice.classList.remove('hidden');
        hideDice.src = `images/dice-${diceFaceNum}.png`;
        //Check for rolled 1: if true, switch to the next player
        if (diceFaceNum !== 1) {
            currentScore += diceFaceNum;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            //Switching the player
            switchPlayer();
        }
    }
});

//Holding the current score and adding it to the player's overall score
btnHoldScore.addEventListener('click', function () {
    if (gameOn) {
        //Add current score to the active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //Check if player's score is >=100
        //Finish the game
        if (scores[activePlayer] >= 100) {
            gameOn = false;
            hideDice.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            //Switch to the next player
            switchPlayer();
        }
    }
});

//Refreshing the game
btnNewGame.addEventListener('click', function () {
    initializeGame();
});
