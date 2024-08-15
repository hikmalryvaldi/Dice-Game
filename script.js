'use strict';

const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const displayDice = document.querySelector('.dice');
displayDice.classList.add('hidden');

let totalScore, currentScore, activePlayer, playing;

const init = function () {
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  totalScore = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;

  // 1. set all scores to 0
  playing = true;
  currentScore = 0;
  totalScore = [0, 0];
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  // 2. set player 1 as starting player
  activePlayer = 0;
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  displayDice.classList.add('hidden');
};
init(); // agar variable yang sudah dideklarasikan mempunyai value    yang seusai dengan fungsi ini.
// cth : playing = null jadi playing = true

// Function switchPlayer
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

// User rolls dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice roll
    displayDice.classList.remove('hidden');
    displayDice.src = `dice-${dice}.png`;

    if (dice === 1) {
      // Yes
      // SwitchPlayer
      switchPlayer();
    } else {
      // No
      // Add dice roll to current score
      currentScore += dice;

      // Display new score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

// User holds score
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to total score
    totalScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScore[activePlayer];

    if (totalScore[activePlayer] >= 50) {
      // Yes
      // Current player wins!
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      playing = false;
    } else {
      // No
      // SwitchPlayer
      switchPlayer();
    }
  }
});

// User resets game
btnNew.addEventListener('click', init);
