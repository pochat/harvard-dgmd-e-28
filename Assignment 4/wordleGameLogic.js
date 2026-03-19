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

    // Grab container
    const gameContainer = document.querySelector('.gameContainer');


    for (row = 0; row < wordLength; row++) { // Render rows

        for (column = 0; column < maxAttempts; column ++) { // Render columns

            // Create the element
            const newTextBox = document.createElement('span');
            
            // Modify the properties
            newTextBox.textContent = "P"
            newTextBox.className = "boxBorder"
            
            // Draw on the DOM
            gameContainer.appendChild(newTextBox)
        }
    }

}