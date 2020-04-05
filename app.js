let score = [0, 0]; // Main score
let roundScore = 0; // Round score
let currentPlayer = 0; // Active player
// let isPlaying = true;

var dice = document.querySelector(".dice");
const rollBtn = document.querySelector(".btn-roll");
const holdBtn = document.querySelector(".btn-hold");
const newGameBtn = document.querySelector(".btn-new");

// Calling setting score to 0 and hiding dice initially
init();

rollBtn.addEventListener("click", updateCurrentScore);
holdBtn.addEventListener("click", holdScore);

newGameBtn.addEventListener("click", init);

function updateCurrentScore() {
  if (isPlaying) {
    // Show dice
    dice.style.display = "block";

    // Get random dice value
    let diceValue = Math.floor(Math.random() * 6 + 1);

    // Get random dice pic every time
    dice.src = `dice-${diceValue}.png`;

    if (diceValue > 1) {
      // Add the dice value to current score
      roundScore += diceValue;

      // Update UI of current score
      document.querySelector(
        `#current-${currentPlayer}`
      ).textContent = roundScore;
    } else {
      togglePlayer();
    }
  }
}

function holdScore() {
  if (isPlaying) {
    // Add round score to global score
    score[currentPlayer] += roundScore;
    console.log(score[currentPlayer]);

    // Check if player wins
    if (score[currentPlayer] >= 10) {
      document.querySelector(`#name-${currentPlayer}`).textContent = "Winner!";
      document.querySelector(".player-0-panel").classList.remove("active");
      document.querySelector(".player-1-panel").classList.remove("active");
      document
        .querySelector(`.player-${currentPlayer}-panel`)
        .classList.add("winner");
      isPlaying = false;
    }

    //  Update the UI of main score
    document.querySelector(`#score-${currentPlayer}`).textContent =
      score[currentPlayer];

    togglePlayer();

    // Hide dice again
    dice.style.display = "none";
  }
}

function togglePlayer() {
  // Make round score to 0
  roundScore = 0;

  // Update UI of current to 0
  document.querySelector(`#current-${currentPlayer}`).textContent = roundScore;

  // Toggle active player
  currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);

  // Toggle active class
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}
