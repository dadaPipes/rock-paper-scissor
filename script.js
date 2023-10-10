const buttons = document.querySelectorAll("button")
const div = document.querySelector("div");
let playerScore = 0;
let computerScore = 0;

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if(playerScore === 5 || computerScore === 5) {
            playerScore   = 0;
            computerScore = 0; 
        }

        const playerChoice   = getPlayerChoice(button);
        const computerChoice = getComputerChoice();
        const roundOutcome   = playRound(playerChoice, computerChoice);

        updateUI(playerChoice, computerChoice, roundOutcome);
    });
});

function getPlayerChoice(button) {
    let playerSelection = "";

    if (button.classList.contains("rock-button")) {
        playerSelection = "rock";
    }
    else if (button.classList.contains("paper-button")) {
        playerSelection = "paper";
    }
    else if (button.classList.contains("scissor-button")) {
        playerSelection = "scissors";
    }

    return playerSelection;
};

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const computerSelection = choices[Math.floor(Math.random() * choices.length)]; // random choice

    return computerSelection;
}

function playRound(playerSelection, computerSelection) {
    const outcomes = {
        "rock": {
            "rock":     { message: "Tie",           playerScore:   0, computerScore: 0 },
            "paper":    { message: "Paper wins",    playerScore:   0, computerScore: 1 },
            "scissors": { message: "Rock wins",     playerScore:   1, computerScore: 0 }
        },
        "paper": {
            "rock":     { message: "Paper wins",    playerScore:   1, computerScore: 0 },
            "paper":    { message: "Tie",           playerScore:   0, computerScore: 0 },
            "scissors": { message: "Scissors wins", playerScore:   0, computerScore: 1 }
        },
        "scissors": {
            "rock":     { message: "Rock wins",     playerScore:   0, computerScore: 1 },
            "paper":    { message: "Scissors wins", playerScore:   1, computerScore: 0 },
            "scissors": { message: "Tie",           playerScore:   0, computerScore: 0 }
        }
    };

    const outcome = outcomes[playerSelection][computerSelection];
    playerScore += outcome.playerScore;
    computerScore += outcome.computerScore;

    return outcome.message;
}

function updateUI(playerChoise, computerChoise, roundOutcome) {
    div.innerHTML = "";

    if(playerScore === 5) {
        appendParagraph("Player wins");
        appendParagraph("player score: "   + playerScore);
        appendParagraph("Computer Score: " + computerScore);
    }
    else if(computerScore === 5) {
        appendParagraph("Computer wins");
        appendParagraph("player score: "   + playerScore);
        appendParagraph("Computer Score: " + computerScore);
    }
    else {
        appendParagraph("Player: "         + playerChoise);
        appendParagraph("Computer: "       + computerChoise);
        appendParagraph(roundOutcome);
        appendParagraph("player score: "   + playerScore);
        appendParagraph("Computer Score: " + computerScore);
    }
}

function appendParagraph(text) {
    const paragraph       = document.createElement("p");
    paragraph.textContent = text;
    div.appendChild(paragraph);
    
}