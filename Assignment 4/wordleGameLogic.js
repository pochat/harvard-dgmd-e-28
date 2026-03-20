// Global variables

const word = "APPLE"; // The word to guess
const maxAttempts = 6; // Maximum number of attempts allowed
const wordLength = 5; // Length of the word to guess
let attempts = 0; // Current number of attempts
let gameOver = false; // Flag to indicate if the game is over

// Initialize when the page loads
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

// User enters their guess word
function guessWord() {

    const userGuessInput = document.getElementById("wordGuess")
    const userGuess = document.getElementById('wordGuess').value.toUpperCase();
    
    // Check if the input is exactly 5 letters
    if (userGuess.length !== wordLength) {
        alert("Please enter exactly 5 letters");
        return; // Stop here, don't process
    }
    
    const insertUserGuessInBox = document.querySelectorAll('.boxBorder')
    
    // Insert one letter per box
    for (let i = 0; i < userGuess.length; i++) {
        insertUserGuessInBox[i].textContent = userGuess[i];

    }

    // Display color indicators to the user
    addColorIndicatorsToGameGrid(userGuess, word)

    // Color the used alphabet board
    addColorIndicatorsToUsedLetterBoard(userGuess, word)

    // Clear input
    userGuessInput.value = ""

    // if (userGuess.includes(word)) {
    //     alert("includes")
    // }
    
}

// Show color indicators to Used Letter Board
function addColorIndicatorsToUsedLetterBoard(userGuess, word) {
    const alphabetBoxes = document.querySelectorAll('#usedLetterBoard span');
    
    // Go through each letter in the alphabet board
    for (let i = 0; i < alphabetBoxes.length; i ++) {
        let box = alphabetBoxes[i];
        let letter = box.textContent;

        
        // Check if this letter is in the user's guess
        for (let i = 0; i < userGuess.length; i++) {
            if (letter === userGuess[i]) {
                // Check if it's the correct position
                if (letter === word[i]) {
                    box.className = "boxBorder green";
                }
                // Check if it's in the word but wrong position
                else if (word.includes(letter)) {
                    box.className = "boxBorder yellow";
                } 
                // Mark the letter as used
                else {
                     box.className = "boxBorder gray";
                }
                
            }
        }
    }
}

// Show color indicators to Game Grid
function addColorIndicatorsToGameGrid(userGuess, word) {

    const insertUserGuessInBox = document.querySelectorAll('.boxBorder')

    // Check if user guess includes any characters in the word and color it
    for (let i = 0; i < userGuess.length; i++) {

        // Check if it's the correct position
        if (userGuess[i] === word[i]) {
            insertUserGuessInBox[i].className = "boxBorder green"
        } 
        else if (word.includes(userGuess[i])) {

            // Check if it's in the word but wrong position
            insertUserGuessInBox[i].className = "boxBorder yellow"
        } 
        else {

            // Mark the letter as used
            insertUserGuessInBox[i].className = "boxBorder gray"
        }
    }
}

// Allow only alphabet letters
function alphabet() {
    let upperCaseAlphabet = ""
    for (let i = 65; i <= 90; i++) {
        upperCaseAlphabet += String.fromCharCode(i)
    }

    return upperCaseAlphabet;

}

function usedLetterBoard(userGuess) {
    userGuess = document.getElementById('wordGuess').value.toUpperCase();
    
    let usedLetterContainer = document.getElementById("usedLetterBoard");
    
    // Assign the alphabet function
    const alphabetString = alphabet();
    
    // Create the letter board
    for (let i = 0; i < alphabetString.length; i++) {

        // Create new element
        const usedLetterBox = document.createElement('span');
        
        // Modify the properties
        usedLetterBox.textContent = alphabetString[i];
        usedLetterBox.className = "boxBorder";
        
        // Draw on the DOM
        usedLetterContainer.appendChild(usedLetterBox);
        addColorIndicatorsToGameGrid(userGuess, word)
    }

    // Display color indicators to the user
}