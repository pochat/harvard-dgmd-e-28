// Global variables

const word = "APPLE"; // The word to guess
const maxAttempts = 6; // Maximum number of attempts allowed
const wordLength = 5; // Length of the word to guess
let attempts = 0; // Current number of attempts
let gameOver = false; // Flag to indicate if the game is over

// Initialize on load

window.onload = function() {
    drawBoard();
}

function drawBoard() {

    // Create the element
    const newTextBox = document.createElement('span');

    // Modify the properties
    newTextBox.textContent = "P"
    newTextBox.className = "boxBorder"

    // Draw on the DOM
    document.body.appendChild(newTextBox)

}