// Start Sreen
const startScreen = document.querySelector(".start-screen");
const startButton = document.querySelector(".start-button");
startButton.addEventListener("click", function () {
  startScreen.style.display = "none";
});

const userScoreDiv = document.getElementById("player-score");
const computerScoreDiv = document.getElementById("computer-score");
const userImg = document.querySelector(".user-hands img");
const computerImg = document.querySelector(".computer-hands img");
const handsBlock = document.querySelector(".hands-block");
const resetBlock = document.querySelector(".reset");
const rpsButtons = document.querySelectorAll(".card");
const resultDiv = document.getElementById("result");

const totalScore = { userScore: 0, computerScore: 0 };

const getComputerChoice = () => {
  const rpsChoice = ["Rock", "Paper", "Scissors"];
  const randomNumber = Math.floor(Math.random() * 3);

  return rpsChoice[randomNumber];
};

const getWinResult = (userChoice, computerChoice) => {
  const userWinCondition =
    (userChoice === "Rock" && computerChoice === "Scissors") ||
    (userChoice === "Paper" && computerChoice === "Rock") ||
    (userChoice === "Scissors" && computerChoice === "Paper");

  if (userChoice === computerChoice) {
    return "tie";
  }
  if (userWinCondition) {
    return "user";
  } else {
    return "computer";
  }
};

// Function to change title and color in DOM
const changeResultDiv = (title, color) => {
  resultDiv.textContent = title;
  resultDiv.style.color = color;
};

const getResult = (userChoice, computerChoice) => {
  const winResult = getWinResult(userChoice, computerChoice);

  if (winResult === "tie") {
    changeResultDiv("Tie", "#f4f458");
  } else if (winResult === "user") {
    totalScore.userScore += 1;
    changeResultDiv("YOU WON!", "#6ded72");
  } else {
    totalScore.computerScore += 1;
    changeResultDiv("Computer won", "#f6b0c0");
  }

  userScoreDiv.textContent = `Your score: ${totalScore.userScore}`;
  computerScoreDiv.textContent = `Computer score: ${totalScore.computerScore}`;
};

const updateHandsImg = (userChoice, computerChoice) => {
  userImg.src = `img/${userChoice.toLowerCase()}.png`;
  computerImg.src = `img/${computerChoice.toLowerCase()}.png`;
};

const onClickRps = (userChoice) => {
  const computerChoice = getComputerChoice();
  updateHandsImg(userChoice, computerChoice);
  getResult(userChoice, computerChoice);

  // console.log({ userChoice });
  // console.log({ computerChoice });
  // console.log(totalScore);
};

const playGame = () => {
  rpsButtons.forEach((rpsButton) => {
    rpsButton.onclick = () => onClickRps(rpsButton.value);
  });
};

const resetGame = () => {
  totalScore.userScore = 0;
  totalScore.computerScore = 0;

  handsBlock.style.display = "none";
  resetBlock.style.display = "none";

  userScoreDiv.textContent = `Your score: 0`;
  computerScoreDiv.textContent = `Computer score: 0`;
  resultDiv.innerHTML = "&nbsp;";
};

document.getElementById("reset-button").addEventListener("click", resetGame);

// To display the hands text, images and play-again button after I choose my card

rpsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handsBlock.style.display = "flex";
    resetBlock.style.display = "flex";
  });
});

window.addEventListener("load", playGame);
