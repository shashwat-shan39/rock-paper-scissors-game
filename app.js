const score = JSON.parse(localStorage.getItem('score')) || { yourScore: 0, compScore: 0 };

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#play");
const userS = document.querySelector("#user");
const compS = document.querySelector("#comp");

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        score.yourScore++;
        userS.innerText = score.yourScore;
        msg.innerText = `You win! ${userChoice} beats ${compChoice}.`;
        msg.style.backgroundColor = "green";
    } else {
        score.compScore++;
        compS.innerText = score.compScore;
        msg.innerText = `You lose. ${compChoice} beats ${userChoice}.`;
        msg.style.backgroundColor = "red";
    }

    // Save scores to localStorage after each update
    localStorage.setItem('score', JSON.stringify(score));
};

const compChoiceGen = () => {
    const options = ["rock", "paper", "scissors"];
    const idx = Math.floor(Math.random() * 3);
    return options[idx];
};

const playGame = (userChoice) => {
    let userWin = true;
    const compChoice = compChoiceGen();
    if (userChoice === compChoice) {
        msg.style.backgroundColor = "black";
        msg.innerText = "It was a draw. Play again.";
    } else {
        if (userChoice == "rock")
            userWin = compChoice === "paper" ? false : true;
        else if (userChoice === "paper")
            userWin = compChoice === "scissors" ? false : true;
        else
            userWin = compChoice === "scissors" ? false : true;
        showWinner(userWin, userChoice, compChoice);
    }
};

// Update the initial display with stored scores
userS.innerText = score.yourScore;
compS.innerText = score.compScore;

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});
