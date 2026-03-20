// Global variables

const word = "APPLE"; // The word to guess
const maxAttempts = 6; // Maximum number of attempts allowed
const wordLength = 5; // Length of the word to guess
let attempts = 0; // Current number of attempts
let gameOver = false; // Flag to indicate if the game is over

// Initialize on load

window.onload = function() {
    drawBoard();
    usedLetterBoard();
}

function drawBoard() {

    // Grab container
    const gameContainer = document.querySelector('.gameContainer');


    // Render Rows
    for (row = 0; row < wordLength; row++) {

        // Render columns
        for (column = 0; column < maxAttempts; column ++) {

            // Create the element
            const newTextBox = document.createElement('span');
            
            // Modify the properties
            newTextBox.textContent = ""
            newTextBox.className = "boxBorder"
            
            // Draw on the DOM
            gameContainer.appendChild(newTextBox)
        }
    }

}

function guessWord() {

    const userGuessInput = document.getElementById("wordGuess")
    const insertUserGuessInBox = document.querySelectorAll('.boxBorder')
    const userGuess = document.getElementById('wordGuess').value.toUpperCase();
    
    // Insert one letter per box
    for (let i = 0; i < userGuess.length; i++) {
        insertUserGuessInBox[i].textContent = userGuess[i];

    }
    
    // Check if user guess includes any characters in the word
    for (let i = 0; i < userGuess.length; i++) {
        if (userGuess[i] === word[i]) {
            insertUserGuessInBox[i].className = "boxBorder green"
        } else if (word.includes(userGuess[i])) {
            insertUserGuessInBox[i].className = "boxBorder yellow"
        }
    }

    // Clear input
    userGuessInput.value = ""

    // if (userGuess.includes(word)) {
    //     alert("includes")
    // }
    
}

function alphabet() {
    let upperCaseAlphabet = ""
    for (let i = 65; i <= 90; i++) {
        upperCaseAlphabet += String.fromCharCode(i)
    }

    return upperCaseAlphabet;

}

function usedLetterBoard() {

    let usedLetterContainer = document.getElementById("usedLetterBoard");
    
    // Assign the alphabet function
    const alphabetString = alphabet();
    
    for (let i = 0; i < alphabetString.length; i++) {
        // Create new element
        const usedLetterBox = document.createElement('span');
        
        // Modify the properties
        usedLetterBox.textContent = alphabetString[i];
        usedLetterBox.className = "boxBorder";
        
        // Draw on the DOM
        usedLetterContainer.appendChild(usedLetterBox);
    }
}