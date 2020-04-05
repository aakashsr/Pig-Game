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
