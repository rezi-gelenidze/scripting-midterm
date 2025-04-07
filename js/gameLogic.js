// get dom elements for manipulation
const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");
const restartBtn = document.getElementById("restart-btn");
const feedback = document.getElementById("feedback");
const inputError = document.getElementById("input-error");
const scoreDisplay = document.getElementById("score");
const attemptsDisplay = document.getElementById("attempts");
const historyList = document.getElementById("history-list");

// game variables
let secretNumber;
let score;
let attempts;

function initGame() {
    // Initialize initial values and generate a new secret number
    secretNumber = Math.floor(Math.random() * 100) + 1;
    score = 10;
    attempts = 0;
    feedback.innerHTML = "";
    inputError.innerText = "";
    guessInput.disabled = false;
    guessInput.value = "";
    scoreDisplay.textContent = score;
    attemptsDisplay.textContent = attempts;
    historyList.innerHTML = "";
}

function showFeedback(message) {
    feedback.innerHTML = `<span>${message}</span>`;
}

function handleGuess() {
    // Parse the guess input and validate it
    const guess = parseInt(guessInput.value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        inputError.textContent = "Please enter a number between 1 and 100!";
        return;
    }

    // Update attempts
    attempts++;
    attemptsDisplay.textContent = attempts;

    // Update score
    score--;
    scoreDisplay.textContent = score;
    
    // Check if the guess is correct
    if (guess === secretNumber) {
        showFeedback("🎉 Correct!");
        guessInput.disabled = true;
        return;
    }

    // Check if the user has spent all attempts
    if (attempts >= 10) {
        showFeedback("💥 Game Over!");
        guessInput.disabled = true;
        return;
    }

    // Provide feedback on the guess by comparison
    const isTooHigh = guess > secretNumber;
    showFeedback(direction = isTooHigh ? "📉 Too High!" : "📈 Too Low!");

    // Generate history entry
    const historyItem = document.createElement("li");
    historyItem.innerHTML = `You guessed <span>${guess}</span> ( ${isTooHigh ? "Too high" : "Too low"} )`;

    // Append history item to the history list
    historyList.appendChild(historyItem);
}


// Event listeners initialization
guessBtn.addEventListener("click", handleGuess);
restartBtn.addEventListener("click", initGame);
window.addEventListener("load", initGame); // Initialize the game when the page loads
