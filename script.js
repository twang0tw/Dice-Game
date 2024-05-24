'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

let scores, curScore, curPlayer, playing;

function init() {
  scores = [0, 0];
  curScore = 0;
  curPlayer = 0;
  playing = true;
  // Starting conditions
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  document
    .querySelector(`.player--${curPlayer}`)
    .classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}
init();

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // generaete a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // check for rolled 1, if true swtich player
    if (dice !== 1) {
      curScore += dice;
      document.querySelector(`#current--${curPlayer}`).textContent = curScore;
    } else {
      switchPlayer();
    }
  }
});

function switchPlayer() {
  document.querySelector(`#current--${curPlayer}`).textContent = 0;
  curPlayer = curPlayer === 0 ? 1 : 0;
  curScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[curPlayer] += curScore;
    document.querySelector(`#score--${curPlayer}`).textContent =
      scores[curPlayer];
    if (scores[curPlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${curPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${curPlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
