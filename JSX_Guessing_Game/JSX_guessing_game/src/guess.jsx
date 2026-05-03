import { Routes, Route, Link } from "react-router-dom"
import { useEffect, useState } from 'react'

// Define global variables in one place
const DEFAULT_GUESSES = 5
const DEFAULT_MIN_RANGE = 0
const DEFAULT_MAX_RANGE = 10
const GUESS_LOW = 'Too Low'
const GUESS_HIGH = 'Too High'
const GUESS_CORRECT = 'Correct. You guessed it!'
const GUESS_OUT_OF_RANGE = 'Your guess is out of range.'
const GUESS_OUT_OF_GUESSES = 'Darn, you are out of guesses.'

//////////////////////////////////////
// Navigation bar at the top or the screen
//////////////////////////////////////
function Nav() {
    return(
        <>
        <div className="navigation-container">
            <Link to="/"> Home </Link>
            <div>
                <Link to="/stats"> Stats </Link>
                <Link to="/settings"> Settings </Link>
            </div>
        </div>
        </>
    )
}

//////////////////////////////////////
// Main landing page
//////////////////////////////////////
function Home( { resetSettings }) {

    // Set states
    const [result, setResult] = useState("")
    const [guessesLeft, setGuessesLeft] = useState(
        Number(localStorage.getItem("maxGuesses")) || DEFAULT_GUESSES
    )

    // This state is needed to reset the math.random after
    // the user presses Restart 
    const [gameKey, setGameKey] = useState(0)


    // Run these when the Restart button is pressed
    function handleRestart() {

        // Clear the result render
        setResult('');
        
        // Adding + 1 tells react it is a new component
        // so the Math Random runs again
        // Weird, but here is an explanation
        // https://www.google.com/search?q=react+use+key+to+reload+component&rlz=1C5CHFA_enCA1142CA1142&oq=react+use+key+to+reload+component&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRhA0gEINzQyNWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8
        setGameKey(gameKey + 1)
    }

    return(
        <div>
            {/* Read the values from the localStorage */}

            {(result !== GUESS_CORRECT && result !== GUESS_OUT_OF_GUESSES) &&

            <div>
                <h1> Guess a number between { localStorage.getItem('minRange') || DEFAULT_MIN_RANGE } and {localStorage.getItem('maxRange') || DEFAULT_MAX_RANGE }
                </h1>
                <p>You have { guessesLeft || DEFAULT_GUESSES } chances to guess the right number. </p>
            </div>
            }


            {/* Load component with input Logic with props */}

            <EnterUserGuess

                key={gameKey} // To track the key value and run Math Random
                guessesLeft={guessesLeft}
                setGuessesLeft={setGuessesLeft}
                result={result}
                setResult={setResult}

            />

            {/* This button must be visible after number of guesses = 1 */}
            {/* React documentation: https://legacy.reactjs.org/docs/conditional-rendering.html */}
            {(guessesLeft === 0 || result === GUESS_CORRECT) &&
                <button className="button-restart" onClick={ handleRestart }>Restart</button>
            }

        </div>
    )
}

//////////////////////////////////////
// This component is for the user to enter their number
//////////////////////////////////////
function EnterUserGuess({ guessesLeft, setGuessesLeft, result, setResult}) {

    // Set state for the Number to Guess
    const [numberToGuess] = useState(() => {
        const min = Number(localStorage.getItem('minRange'))
        const max = Number(localStorage.getItem('maxRange'))

        // Pick a random number to guess
        return Math.floor(Math.random() * (max - min)) + min
    })

    // Re-assign the argument to a local variable
    let guessRemaining = setGuessesLeft

    // Debug
    console.log("Number to Guess:", numberToGuess)
    console.log('remaining guesses:' , guessesLeft);

    function handleGuess(e) {

        // Don't refresh the page after submit
        e.preventDefault();

        const guess = Number(e.target.userGuess.value);
        const min = Number(localStorage.getItem('minRange'));
        const max = Number(localStorage.getItem('maxRange'));

        if (isNaN(guess)) return;

        e.target.userGuess.value = '';

        ////////////////////////////////////////////////////////////////
        // Game Conditions
        // NOTE: This order matters. List wrong first
        ////////////////////////////////////////////////////////////////

        // Out of range check FIRST
        if (guess < min || guess > max) {
            setResult(GUESS_OUT_OF_RANGE);
            const current = Number(localStorage.getItem("maxGuesses")) || DEFAULT_GUESSES;
            localStorage.setItem("maxGuesses", current - 1);
            return;
        }

        // Logic for too low, high, or correct
        if (guess < numberToGuess) {
            setResult(GUESS_LOW);
        } else if (guess > numberToGuess) {
            setResult(GUESS_HIGH);
        } else {
            setResult(GUESS_CORRECT);

            // Save game stats to local storage

            // Number of games won
            const gamesWon = Number(localStorage.getItem("gamesWon")) || 0
            localStorage.setItem("gamesWon", gamesWon + 1)

            // Average number of guesses needed  
            const totalGuesses = Number(localStorage.getItem("totalGuesses")) || 0
            const guessesUsed = Number(localStorage.getItem("maxGuesses")) - guessesLeft
            localStorage.setItem("totalGuesses", totalGuesses + totalGuesses + guessesUsed)

            // Number of games played
            const gamesPlayed = Number(localStorage.getItem("gamesPlayed")) || 0
            localStorage.setItem("gamesPlayed", gamesPlayed + 1)

            return; // Leave this return; otherwise, stats won't work.
        }

        // Out of remaining guesses
        if ( guessesLeft <= 1) { // Set to 1 because the state shows 0
            setResult(GUESS_OUT_OF_GUESSES)
            setGuessesLeft(0)
            return; // Stop right here, bro.
        }


        // deduct guess after each attempt
        const newGuessesLeft = guessesLeft - 1
        setGuessesLeft(newGuessesLeft)
        localStorage.setItem("guessRemaining", newGuessesLeft)
   
    }

    // Assign colors if result is too high or low
        let resultColor = null;

        if (result === GUESS_LOW || result === GUESS_HIGH || result === GUESS_OUT_OF_RANGE || result === GUESS_OUT_OF_GUESSES) {
            resultColor = "red"
        } else {
            resultColor = "green"
        }

    return(
        <div>

            {(result !== GUESS_CORRECT && result !== GUESS_OUT_OF_GUESSES) &&
            <form method="post" onSubmit={ handleGuess }>
                <input type="number" name="userGuess" placeholder="Enter your best guess"/>
                <button type="submit">Guess</button>
            </form>
            }

            <h3 style={{ color: resultColor }}>{ result }</h3>

            {/* Render only if user ran out of guesses */}
            {/* React documentation: https://legacy.reactjs.org/docs/conditional-rendering.html */}
            {(result === GUESS_OUT_OF_GUESSES || result === GUESS_CORRECT) &&
                <h2>The number was: {numberToGuess}</h2>
            }

        </div>
    )
}


//////////////////////////////////////
// Game settings logic
//////////////////////////////////////
function Settings( {resetSettings} ) {

    // Note: Hooks cannot be inside functions
    ////////////////////////////////////////////
    // Set states for Number of guesses
    ////////////////////////////////////////////
    const [numberOfGuesses, setNumberOfGuesses] = useState(
        () => {
            return Number(localStorage.getItem("maxGuesses")) || DEFAULT_GUESSES
        }
    )

    // User to increase / decrease the number of guesses
    function changeGuesses(newGuessNumber) {
        const currentGuessNumber = numberOfGuesses + newGuessNumber

        // Don't let the guess number below zero
        if (currentGuessNumber < 0) {
            return // exit early
        }

        setNumberOfGuesses(currentGuessNumber)
        localStorage.setItem("maxGuesses", currentGuessNumber)
    }
    
    ////////////////////////////////////////////
    // Set states for Min and Max range
    ////////////////////////////////////////////
    const [minRange, setMinRange] = useState(() => {
        return Number(localStorage.getItem("minRange")) || DEFAULT_MIN_RANGE
    })

    const [maxRange, setMaxRange] = useState(() => {
        return Number(localStorage.getItem("maxRange")) || DEFAULT_MAX_RANGE
    })

    // User to increase / decrease the range
    function changeRange(minNumber, maxNumber) {
        const currentMinRange = minRange + minNumber
        const currentMaxRange = maxRange + maxNumber

        setMinRange(currentMinRange);
        setMaxRange(currentMaxRange);
        localStorage.setItem("minRange", currentMinRange)
        localStorage.setItem("maxRange", currentMaxRange)
    }

    ////////////////////////////////////////////
    // Reset settings
    ////////////////////////////////////////////
    function resetSettings() {

        // Update the state
        setNumberOfGuesses(DEFAULT_GUESSES);
        setMinRange(DEFAULT_MIN_RANGE);
        setMaxRange(DEFAULT_MAX_RANGE);

        // Rewrite to local storage
        localStorage.setItem("maxGuesses", DEFAULT_GUESSES)
        localStorage.setItem("minRange", DEFAULT_MIN_RANGE)
        localStorage.setItem("maxRange", DEFAULT_MAX_RANGE)
        localStorage.removeItem("guessRemaining")

    }
    
    return(
        <>
        <h1>Game settings:</h1>

            <div className="settings-container">
                {/* Number of Guesses */}
                <div className="settings">
                    <p>Max guesses = { numberOfGuesses }</p>

                    {/* By adding () => it waits for the button to be clicked */}
                    <button onClick={ () => changeGuesses(-1) }> - </button>
                    <button onClick={ () => changeGuesses(+1) }> + </button>
                </div>

                {/* Min Range Guess */}
                <div className="settings">
                    <p>Min number = { minRange }</p>

                    {/* By adding () => it waits for the button to be clicked */}
                    <button onClick={ () => changeRange(-1, 0) }> - </button>
                    <button onClick={ () => changeRange(+1, 0) }> + </button>
                </div>

                {/* Max Range Guess */}
                <div className="settings">
                    <p>Max number = { maxRange }</p>

                    {/* By adding () => it waits for the button to be clicked */}
                    <button onClick={ () => changeRange(0, -1) }> - </button>
                    <button onClick={ () => changeRange(0, +1) }> + </button>
                </div>

                {/* Reset */}
                <div>
                    <button className="button-reset" onClick={ resetSettings }> Reset </button>
                </div>
            </div>
        </>
    )
}

//////////////////////////////////////
// Game Stats logic
//////////////////////////////////////
function GameStats() {

    
    const gamesWon = Number(localStorage.getItem("gamesWon")) || 0
    const totalGuesses = Number(localStorage.getItem("totalGuesses")) || 0
    let average = null
    
    // Eliminate decimals from the average results
    // 3.33333. -> 3
    if (gamesWon > 0) {
        average = Math.floor(totalGuesses / gamesWon)
    }

    function resetGameStats() {
        localStorage.setItem("gamesWon", 0)
        localStorage.setItem("totalGuesses", 0)
    }

    return (
        <div>
            <h1>Game Stats</h1>
            <p>Games won: {gamesWon}</p>
            <p>Average number of guesses needed: {average}</p>

            <button className="button-reset" onClick={resetGameStats}>
                Reset stats
            </button>
        </div>
    )
}

//////////////////////////////////////
// Grouping all game functionality in the MyApp component
//////////////////////////////////////
function MyApp() {

    // Run this code after the component appear on the screen
    useEffect(() => {
        if (!localStorage.getItem("guessRemaining")) {
            localStorage.setItem("guesses", DEFAULT_GUESSES);
        }
        if (!localStorage.getItem("minRange")) {
            localStorage.setItem("minRange", DEFAULT_MIN_RANGE);
        }
        if (!localStorage.getItem("maxRange")) {
            localStorage.setItem("maxRange", DEFAULT_MAX_RANGE);
        }
    }, []);


    return (
        <div>
            <Nav />
            <div className="container">
                <Routes>
                    <Route path="/" element={ <Home/> } />
                    <Route path="/settings" element={ <Settings/> } />
                    <Route path="/stats" element={ <GameStats/> } />
                </Routes>
            </div>
            
        </div>
    )
}

export default MyApp