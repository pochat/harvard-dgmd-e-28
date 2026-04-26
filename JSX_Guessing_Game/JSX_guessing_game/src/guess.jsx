import { Routes, Route, Link } from "react-router-dom"
import { useState } from 'react'

// Define global variables
const DEFAULT_GUESSES = 5
const DEFAULT_MIN_RANGE = 0
const DEFAULT_MAX_RANGE = 10

// Navigation bar at the top or the screen
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

// Main landing page
function Home() {

    return(
        <div>
            {/* Read the values from the localStorage */}
            <h1> Guess a number between { localStorage.getItem('minRange') } and {localStorage.getItem('maxRange')}
            </h1>
            <p>You have { localStorage.guesses} chances to guess the right number. </p>
        </div>
    )
}

function EnterUserGuess() {

    // Set state for the Number to Guess
    const [numberToGuess] = useState(() => {
        const min = Number(localStorage.getItem('minRange'))
        const max = Number(localStorage.getItem('maxRange'))

        // Pick a number to guess
        return Math.floor(Math.random() * (max - min)) + min
    })

    // Debug
    console.log("Number to Guess:", numberToGuess)
    

    // Set the state for the result
    const [ result, setResult ] = useState("")

    function handleGuess(e) {

        // prevent browser from reloading the page
        e.preventDefault();

        // Read the input data
        const guess = e.target.userGuess.value;
        
        // Clear the input
        e.target.userGuess.value = ''

        if ( guess < numberToGuess) {
            setResult("Too Low")
        } else if (guess > numberToGuess) {
            setResult("Too high")
        } else {
            setResult("Correct!")
        }
    }

    return(
        <div>
            <form method="post" onSubmit={handleGuess}>
                <input type="text" name="userGuess" placeholder="Enter your best guess"/>
                <button type="submit">Is it this number?</button>

            </form>

            <h3>{ result }</h3>

        </div>
    )
}


// Settings route logic
function Settings() {

    // Note: Hooks cannot be inside functions
    ////////////////////////////////////////////
    // Set states for Number of guesses
    ////////////////////////////////////////////
    const [numberOfGuesses, setnumberOfGuesses] = useState(() => {
        return Number(localStorage.getItem("guesses")) || DEFAULT_GUESSES
    })

    // User to increase / decrease the number of guesses
    function changeGuesses(newGuessNumber) {
        const currentGuessNumber = numberOfGuesses + newGuessNumber

        // Don't let the guess number below zero
        if (currentGuessNumber < 0) {
            return // exit early
        }

        setnumberOfGuesses(currentGuessNumber)
        localStorage.setItem("guesses", currentGuessNumber)
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
        localStorage.removeItem("guesses")
        localStorage.removeItem("minRange")
        localStorage.removeItem("maxRange")

        // Call the states again to reset
        setnumberOfGuesses(DEFAULT_GUESSES)
        setMinRange(DEFAULT_MIN_RANGE)
        setMaxRange(DEFAULT_MAX_RANGE)
    }
    
    return(
        <>
        <h1>Game settings:</h1>

            <div className="settings-container">
                {/* Number of Guesses */}
                <div className="settings">
                    <p>Guesses allowed = { numberOfGuesses }</p>

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
                <div className="settings">
                    <button onClick={resetSettings}> Reset </button>
                </div>
            </div>
        </>
    )
}

// Stats logic
function Stats() {
    return(
        <h1>Hello from stats component</h1>
    )
}


// Grouping all in this componenent
function MyApp() {

    if (!localStorage.getItem("guesses")) localStorage.setItem("guesses", DEFAULT_GUESSES)
    if (!localStorage.getItem("minRange")) localStorage.setItem("minRange", DEFAULT_MIN_RANGE)
    if (!localStorage.getItem("maxRange")) localStorage.setItem("maxRange", DEFAULT_MAX_RANGE)

    return (
        <div>
            <Nav />
            <div className="container">
                <Routes>
                    <Route path="/" element={ <Home/> } />
                    <Route path="/settings" element={ <Settings/> } />
                    <Route path="/stats" element={ <Stats/> } />
                </Routes>
                <EnterUserGuess />
            </div>
            
        </div>
    )
}

export default MyApp