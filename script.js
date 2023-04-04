window.addEventListener("load", function () {
  const totalScore = { playerScore: 0, computerScore: 0 };
  let playerCounter = 1;
  let computerCounter = 1;

  const playerScoreDiv = document.getElementById("player-score");
  const computerScoreDiv = document.getElementById("computer-score");
  const playerImg = document.querySelector(".user-hands img");
  const computerImg = document.querySelector(".computer-hands img");
  const handsBlock = document.querySelector(".hands-block");
  const resetBlock = document.querySelector(".reset");
  const rpsButtons = document.querySelectorAll(".card");
  const resultDiv = document.getElementById("result");

  const getComputerChoice = () => {
    const rpsChoice = ["Rock", "Paper", "Scissors"];
    const randomNumber = Math.floor(Math.random() * 3);

    return rpsChoice[randomNumber];
  };

  const getResult = (playerChoice, computerChoice) => {
    let userScore = 0;
    let computerScore = 0;

    // Tie
    if (playerChoice === computerChoice) {
      return { userScore, computerScore };
      // Situations where I win
    } else if (playerChoice === "Rock" && computerChoice === "Scissors") {
      userScore += 1;
    } else if (playerChoice === "Paper" && computerChoice === "Rock") {
      userScore += 1;
    } else if (playerChoice === "Scissors" && computerChoice === "Paper") {
      userScore += 1;
      // Situations where I lose
    } else {
      computerScore += 1;
    }
    return { userScore, computerScore };
  };

  const showResult = () => {
    const { playerScore, computerScore } = totalScore;

    if (playerCounter === playerScore) {
      resultDiv.innerText = "YOU WON!";
      resultDiv.style.color = "#6ded72";
      playerCounter += 1;
    } else if (computerCounter === computerScore) {
      resultDiv.innerText = "Computer won";
      resultDiv.style.color = "#f6b0c0";
      computerCounter += 1;
    } else {
      resultDiv.innerText = "Tie";
      resultDiv.style.color = "#f4f458";
    }

    playerScoreDiv.innerText = `Your score: ${playerScore}`;
    computerScoreDiv.innerText = `Computer score: ${computerScore}`;
  };

  const updateHandsImg = (playerChoice, computerChoice) => {
    playerImg.src = `img/${playerChoice.toLowerCase()}.png`;
    computerImg.src = `img/${computerChoice.toLowerCase()}.png`;
  };

  const onClickRps = (playerChoice) => {
    const computerChoice = getComputerChoice();
    const { userScore, computerScore } = getResult(
      playerChoice,
      computerChoice
    );

    updateHandsImg(playerChoice, computerChoice);

    if (userScore > 0) {
      totalScore.playerScore += 1;
    } else if (computerScore > 0) {
      totalScore.computerScore += 1;
    }

    // console.log({ playerChoice });
    // console.log({ computerChoice });
    // console.log(totalScore);

    showResult(playerChoice, computerChoice);
  };

  const playGame = () => {
    rpsButtons.forEach((rpsButton) => {
      rpsButton.onclick = () => onClickRps(rpsButton.value);
    });
  };

  const resetGame = () => {
    totalScore.playerScore = 0;
    totalScore.computerScore = 0;
    playerCounter = 1;
    computerCounter = 1;

    handsBlock.style.display = "none";
    resetBlock.style.display = "none";

    playerScoreDiv.innerText = `Your score: 0`;
    computerScoreDiv.innerText = `Computer score: 0`;
    playerImg.src = "img/paper.png";
    computerImg.src = "img/paper.png";
    resultDiv.innerHTML = "&nbsp;";
  };

  document.getElementById("reset-button").addEventListener("click", resetGame);

  // To display the hands text, images and Play again button after I choose my card

  rpsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      handsBlock.style.display = "flex";
      resetBlock.style.display = "flex";
    });
  });

  playGame();
});
