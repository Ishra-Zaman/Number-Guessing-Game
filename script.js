let guesses;
let correctNumber;
let numGuesses;

window.onload = function () {
  initGame();
  document.getElementById("number-submit").addEventListener("click", playGame);
  document.getElementById("restart-game").addEventListener("click", initGame);
};

function playGame() {
  let numberGuess = document.getElementById("number-guess").value;
  console.log('numberGuess', numberGuess);
  if(numberGuess === "") {
    alert("In order to start the game, you need to insert a number into the field!");
    return false;
  } else if (numberGuess>100) {
    alert("Please enter a number less than 100!");
    resetInputField(); 
    return false;
  } else if (numberGuess<1) {
    alert("Please enter a number greater than 1!");
    resetInputField(); 
    return false;
  }

  saveGuessHistory(numberGuess);
  displayHistory();
  displayResult(numberGuess);
  decreaseRemainingGuesses(); 
  resetInputField();
}

function initGame() {
  correctNumber = getRandomNumber();
  guesses = [];
  numGuesses = 10;
  displayHistory();
  resetResultContent();
  resetInputField();
  displayRemainingGuesses(); 
}

function getRandomNumber() {
  return Math.floor(Math.random() * 100 + 1);
}

function saveGuessHistory(guess) {
  guesses.push(guess);
}

function displayResult(numberGuess) {
  if (numberGuess > correctNumber) {
    showNumberAbove();
  } else if (numberGuess < correctNumber) {
    showNumberBelow();
  } else {
    showYouWon();
  }
}

function resetResultContent() {
  document.getElementById("result").innerHTML = "";
}

function resetInputField() {
  document.getElementById("number-guess").value = "";
}

function displayHistory() {
  let index = guesses.length - 1;
  console.log("index", index);
  let list = "<ul class='list-group'>";
  while (index >= 0) {
    list +=
      "<li class='list-group-item'>" +
      "You guessed " +
      guesses[index] +
      "</li>";
    index = index - 1;
  }
  list += "</ul>";
  document.getElementById("history").innerHTML = list;
}

function getDialog(dialogType, text) {
  let dialog;
  switch (dialogType) {
    case "warning":
      dialog = "<div class='alert alert-warning' role='alert'>";
      break;
    case "won":
      dialog = "<div class='alert alert-success' role='alert'>";
      break;
  }
  dialog += text;
  dialog += "</div>";
  return dialog;
}

function showNumberAbove() {
  const text = "You need to aim lower; your guess is too high!";
  let dialog = getDialog("warning", text);
  document.getElementById("result").innerHTML = dialog;
}

function showNumberBelow() {
  const text = "You need to aim higher; your guess is too low!";
  let dialog = getDialog("warning", text);
  document.getElementById("result").innerHTML = dialog;
}

function showYouWon() {
  const text = "Awesome job, you guessed correctly!";
  let dialog = getDialog("won", text);
  document.getElementById("result").innerHTML = dialog;
}

function decreaseRemainingGuesses() {
  numGuesses--; 
  displayRemainingGuesses();

  if (numGuesses === 0) {
    showGameOver();
  }
}

function showGameOver() {
  alert("Game Over!");
    initGame(); 
}

function displayRemainingGuesses() {
  document.querySelector(".lastResult").textContent = numGuesses; 
}

