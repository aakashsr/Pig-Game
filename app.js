let score = [0, 0]; // Main score
let roundScore = 0; // Round score
let currentPlayer = 0; // Active player

let count = 0;
var lastRoll = 0;

var dice0 = document.querySelector(".dice-0");
var dice1 = document.querySelector(".dice-1");
const rollBtn = document.querySelector(".btn-roll");
const holdBtn = document.querySelector(".btn-hold");
const newGameBtn = document.querySelector(".btn-new");
const instructionBtn = document.querySelector(".btn-instructions");

// Capturing enter button
document.addEventListener("keypress", function (e) {
  // Getting target score value;
  var targetScore = document.querySelector(".target-score").value;
  if (e.which === 13 || e.keyCode === 13) {
    if (targetScore !== "") {
      setScore(targetScore);
    }
  }
});
// Function to display set score input initially and hide it later and to hide goal score initially and display it later.
function setScore(targetScore) {
  document.querySelector(".winScore").textContent = targetScore;
  document.querySelector(".winScoreContainer").style.display = "block";
  document.querySelector(".tagetscoreContainer").style.display = "none";
}

// Calling setting score to 0 and hiding dice initially
init();

rollBtn.addEventListener("click", updateCurrentScore);
holdBtn.addEventListener("click", holdScore);

newGameBtn.addEventListener("click", init);

instructionBtn.addEventListener("click", () => {
  document.querySelector(".instruction-overlay").classList.toggle("hide");
  document.querySelector(".instruction").classList.toggle("hide");
  console.log("ins");
});

function updateCurrentScore() {
  // Getting target score value;
  var targetScore = document.querySelector(".target-score").value;
  if (isPlaying) {
    if (targetScore !== "") {
      setScore(targetScore);
    } else {
      return false; // If input is empty , move out and don't run any code below
    }

    // Show dice
    dice0.style.display = "block";
    dice1.style.display = "block";

    // Get random dice value
    let diceValue0 = Math.floor(Math.random() * 6 + 1);
    let diceValue1 = Math.floor(Math.random() * 6 + 1);

    console.log(diceValue0, diceValue1);

    let thisRoll = diceValue0;
    let thatRoll = diceValue1;

    // Get random dice pic every time
    dice0.src = `dice-${diceValue0}.png`;
    dice1.src = `dice-${diceValue1}.png`;

    if (diceValue0 === 1 || diceValue1 === 1) {
      togglePlayer();
    } else if (thisRoll === 6 && thatRoll === 6) {
      score[currentPlayer] = 0;

      // update UI of main score to 0
      document.querySelector(`#score-${currentPlayer}`).textContent =
        score[currentPlayer];
      // First update UI then toggle player
      togglePlayer();
    } else {
      // Add the dice value to current score
      roundScore += diceValue0 + diceValue1;
      //  roundScore += diceValue;

      // Update UI of current score
      document.querySelector(
        `#current-${currentPlayer}`
      ).textContent = roundScore;
    }
  }
}

function holdScore() {
  if (isPlaying) {
    // Add round score to global score
    score[currentPlayer] += roundScore;

    //  Update the UI of main score
    document.querySelector(`#score-${currentPlayer}`).textContent =
      score[currentPlayer];

    // Capturing target score of game to compare with player score
    var targetScore = document.querySelector(".target-score").value;

    // Check if player wins
    if (score[currentPlayer] >= targetScore) {
      document.querySelector(`#name-${currentPlayer}`).textContent = "Winner!";
      document.querySelector(".player-0-panel").classList.remove("active");
      console.log("removed");
      document.querySelector(".player-1-panel").classList.remove("active");
      document
        .querySelector(`.player-${currentPlayer}-panel`)
        .classList.add("winner");
      document.querySelector(
        `.player-${currentPlayer}-panel .player-logo img`
      ).style.transform = "scale(1.15)";
      isPlaying = false;
    } else {
      togglePlayer();
    }

    // Hide dice again
    dice0.style.display = "none";
    dice1.style.display = "none";
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

function init() {
  // Hide dice initially
  dice0.style.display = "none";
  dice1.style.display = "none";

  score = [0, 0];
  roundScore = 0;
  currentPlayer = 0;
  // State variable
  isPlaying = true;

  // Removing any transform property on both player logos
  document.querySelector(`.player-0-panel .player-logo img`).style.transform =
    "scale(1)";
  document.querySelector(`.player-1-panel .player-logo img`).style.transform =
    "scale(1)";

  // Setting initial score to 0
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.querySelector("#name-0").textContent = "Player 0";
  document.querySelector("#name-1").textContent = "Player 1";
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.add("active");
}
