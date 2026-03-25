// Global variables

const word = "APPLE"; // The word to guess
const maxAttempts = 6; // Maximum number of attempts allowed
const wordLength = 5; // Length of the word to guess
let attempts = 0; // Current number of attempts
let gameOver = false; // Flag to indicate if the game is over
let wordChars = {}; // Empty object to count duplicate characters
let modal; // For the win and lose screen


// Initialize when the page loads
window.onload = function() {
    const closeModal = document.getElementById("modalCloseID");
    modal = document.getElementById("modalWindow");
    drawBoard();
    usedLetterBoard();
    disabledButtonIfEmpty();
    document.getElementById("restartButton").style.display = "block"; //show
    document.getElementById("wordGuess").style.display = "none"; // hide
    document.getElementById("submitButton").style.display = "none"; // hide
    document.getElementById("gameInstructions").style.display = "none"; // hide
    document.getElementById("modalWindow").style.display = "none"; // hide


    // Show the word to guess in the console for the professors
    console.log("Word to guess: ", word);
    

    // When the user clicks on <span> (x), close the modal
    if (closeModal) {
        closeModal.onclick = function() {
            modal.style.display = "none";
        }
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target.id === "modalWindow") {
        modal.style.display = "none";
      }
    }

}

function startGame() {
    // Reset the attempts counter (this is what controls the game)
    attempts = 0;
    gameOver = false;

    // Toggle button visibility
    document.getElementById("wordGuess").style.display = "block";
    document.getElementById("submitButton").style.display = "block";
    document.getElementById("gameInstructions").style.display = "block";
    document.getElementById("restartButton").style.display = "none";
    document.getElementById("modalWindow").style.display = "none"; // hide


    // Clear all boxes
    const gameGrid = document.querySelectorAll('.boxBorder');
    for (let i = 0; i < 30; i++) {
        gameGrid[i].textContent = "";
        gameGrid[i].className = "boxBorder";
    }
    
    // Reset alphabet board
    const alphabetBoxes = document.querySelectorAll('#usedLetterBoard span');
    for (let i = 0; i < alphabetBoxes.length; i++) {
        alphabetBoxes[i].className = "boxBorder";
    }
    
    // Clear input
    document.getElementById("wordGuess").value = "";
    
    // Re-disable button
    disabledButtonIfEmpty();
}

// Create the elements for the game board
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

// Don't let the user submit if the input is less than five characters
function disabledButtonIfEmpty() {
    const button = document.getElementById("submitButton")
    const inputField = document.getElementById("wordGuess")

    if (inputField.value.length < 5) {
        button.disabled = true;
        button.className = "submitWordButton disabled"
    } else {
        button.disabled = false;
        button.className = "submitWordButton"
    }
}

// User enters their guess word
function guessWord() {

    // Check if the user run out of attempts
    checkGameOver()

    const userGuessInput = document.getElementById("wordGuess")
    const userGuess = document.getElementById('wordGuess').value.toUpperCase();
    
    // Check if the input is exactly 5 letters
    if (userGuess.length !== wordLength) {
        alert("Please enter exactly 5 letters");
        return; // Stop here, don't process
    }
    
    // Grab the element
    const insertUserGuessInBox = document.querySelectorAll('.boxBorder')

    // Calculate which row to fill
    const startRow = attempts * 5;

    // Insert one letter per box
    for (let i = 0; i < userGuess.length; i++) {
        insertUserGuessInBox[startRow + i].textContent = userGuess[i];
    }

    // Display color indicators to the user
    addColorIndicatorsToGameGrid(userGuess, word, attempts)

    // Color the used alphabet board
    addColorIndicatorsToUsedLetterBoard(userGuess, word)

    // Clear input
    userGuessInput.value = ""

    // Advance to next row
    attempts++;

    // Game Win
    gameWon(userGuess, word)
    checkGameOver()
}

// User wins by guessing the word
function gameWon(userGuess, word) {
    if (userGuess === word) {
        setTimeout(function() {
            
            // Toggle button visibility
            document.getElementById("submitButton").style.display = "none";
            document.getElementById("restartButton").style.display = "block";
            document.getElementById("wordGuess").style.display = "none";
            document.getElementById("gameInstructions").style.display = "none"; // hide
            document.getElementById("modalWindow").style.display = "flex"; // show
            document.getElementById("modalContentText").innerHTML = "🏆<br>You won!";


        }, 100)
    }
    disabledButtonIfEmpty();

}

// User loses
function checkGameOver() {
    if (attempts === 6) {
         setTimeout(function() {

        // Toggle button visibility
        document.getElementById("wordGuess").style.display = "none";
        document.getElementById("submitButton").style.display = "none";
        document.getElementById("restartButton").style.display = "block";
        document.getElementById("modalWindow").style.display = "flex";
        document.getElementById("modalContentText").innerHTML = "🤪<br>Game Over!";


        }, 100)
    }
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

// Function to check how many letters are duplicated
function countDuplicatedCharacters(word) {
    for (i = 0; i < word.length; i++) {
        let char = word[i];

        // If the character does not exist in the object, assign value of 0
        wordChars[char] = (wordChars[char] || 0) + 1; 
    }

    return wordChars;
    
}

// Show color indicators to Game Grid
function addColorIndicatorsToGameGrid(userGuess, word, attempts) {

    const insertUserGuessInBox = document.querySelectorAll('.boxBorder')
    
    // Calculate which row to color
    const startIndex = attempts * 5; // 5 columns per row

    // Get character counts from the word
    const charCounts = countDuplicatedCharacters(word);

    // Check if user guess includes any characters in the word and color it
    for (let i = 0; i < userGuess.length; i++) {

        // Check if it's the correct position
        if (userGuess[i] === word[i]) {
            insertUserGuessInBox[startIndex + i].className = "boxBorder green"
        } 
        else if (word.includes(userGuess[i]) || userGuess.includes(charCounts)) {

            // Check if it's in the word but wrong position
            insertUserGuessInBox[startIndex + i].className = "boxBorder yellow"
        } 
        else {

            // Mark the letter as used
            insertUserGuessInBox[startIndex + i].className = "boxBorder gray"
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

}

