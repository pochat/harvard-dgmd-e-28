import { Routes, Route, Link } from "react-router-dom"
import { useState } from 'react'

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


function Home() {

    return(
        <div>
            <h1>
                This is the home page
            </h1>
        </div>
    )
}


function Settings() {

    // Note: Hooks cannot be inside functions
    ////////////////////////////////////////////
    // Set states for Number of guesses
    ////////////////////////////////////////////
    const [numberOfGuesses, setnumberOfGuesses] = useState(() => {
        return Number(localStorage.getItem("guesses")) || 5
    })

    // User to increase / btnDecrease the number of guesses
    function changeGuesses(newGuessNumber) {
        const currentGuessNumber = numberOfGuesses + newGuessNumber

        setnumberOfGuesses(currentGuessNumber)
        localStorage.setItem("guesses", currentGuessNumber)
    }
    
    ////////////////////////////////////////////
    // Set states for Min and Max range
    ////////////////////////////////////////////
    const [minRange, setMinRange] = useState(() => {
        return Number(localStorage.getItem("minRange")) || 0
    })

    const [maxRange, setMaxRange] = useState(() => {
        return Number(localStorage.getItem("maxRange")) || 100
    })

    function changeRange(minNumber, maxNumber) {
        const currentMinRange = minRange + minNumber
        const currentMaxRange = maxRange + maxNumber

        setMinRange(currentMinRange);
        setMaxRange(currentMaxRange);
        localStorage.setItem("minRange", currentMinRange)
        localStorage.setItem("maxRange", currentMaxRange)
    }
    
    return(
        <>
        <h1>Game settings:</h1>

            <div className="settings-container">
                {/* Number of Guesses */}
                <div className="settings">
                    <p>Number of guesses allowed = { numberOfGuesses }</p>

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
                    <p>max number = { maxRange }</p>

                    {/* By adding () => it waits for the button to be clicked */}
                    <button onClick={ () => changeRange(0, -1) }> - </button>
                    <button onClick={ () => changeRange(0, +1) }> + </button>
                </div>
            </div>
        </>
    )
}

function Stats() {
    return(
        <h1>Hello from stats component</h1>
    )
}


function MyApp() {
    
    return (
        <div>
            <Nav />
            <div className="container">
                <Routes>
                    <Route path="/" element={ <Home/> } />
                    <Route path="/settings" element={ <Settings/> } />
                    <Route path="/stats" element={ <Stats/> } />
                </Routes>
            </div>
        </div>
    )
}

export default MyApp