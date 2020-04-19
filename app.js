let score = [0, 0]; // Main score
let roundScore = 0; // Round score
let currentPlayer = 0; // Active player

let count = 0;
var lastRoll = 0;

var dice0 = document.querySelector(".dice-0");
var dice1 = document.querySelector(".dice-1");
// var dice = document.querySelector(".dice");
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
    dice0.style.display = "block";
    dice1.style.display = "block";
    // dice.style.display = "block";

    // Get random dice value
    let diceValue0 = Math.floor(Math.random() * 6 + 1);
    let diceValue1 = Math.floor(Math.random() * 6 + 1);
    // let diceValue = Math.floor(Math.random() * 6 + 1);
    console.log(diceValue0, diceValue1);
    // console.log(diceValue);
    // diceValue = 6;
    let thisRoll = diceValue0;
    let thatRoll = diceValue1;
    // let thisRoll = diceValue;

    // Get random dice pic every time
    dice0.src = `dice-${diceValue0}.png`;
    dice1.src = `dice-${diceValue1}.png`;
    // dice.src = `dice-${diceValue}.png`;

    // if (diceValue === 6) {
    //   lastRoll = 6;
    //   count += 1;
    // } else {
    //   lastRoll = 0;
    //   count = 0;
    // }

    if (diceValue0 === 1 || diceValue1 === 1) {
      togglePlayer();
      // Hide dice again
      dice0.style.display = "none";
      dice1.style.display = "none";
    } else if (thisRoll === 6 && thatRoll === 6) {
      score[currentPlayer] = 0;

      // update UI of main score to 0
      document.querySelector(`#score-${currentPlayer}`).textContent =
        score[currentPlayer];
      // First update UI then toggle player
      togglePlayer();

      // Hide the dice
      dice0.style.display = "none";
      dice1.style.display = "none";
      //  dice.style.display = "none";
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
    // console.log(score[currentPlayer]);

    // Check if player wins
    if (score[currentPlayer] >= 100) {
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
    dice0.style.display = "none";
    dice1.style.display = "none";
    // dice.style.display = "none";
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
  // dice.style.display = "none";

  score = [0, 0];
  roundScore = 0;
  currentPlayer = 0;
  // State variable
  isPlaying = true;

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
