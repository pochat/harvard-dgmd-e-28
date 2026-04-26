import { useState } from 'react'
import './App.css'

/////////////////////////////////////
// Global variables
/////////////////////////////////////
const CITIES = ['Boston', 'Vancouver', 'Dehli', 'Mexico']


/////////////////////////////////////
// Add city after input - Component
/////////////////////////////////////
function AddCity() {

    // Hook for new city from the input
    const [inputCity, setInputCity] = useState('')

    // Logic for the input value
    function addCityToArray(e) {

        // Reassign
        setInputCity = e.target.addCity.value;

        // prevent browser from reloading the page
        e.preventDefault();

        // debug
        console.log("Handle guess value:", setInputCity);
        
    }

    return(
        <>
        <div className='container'>
            {/* Title */}
            <h2>Step 1: Add a city</h2>           

            {/* Input form to accept new cities */}
            <form method="post" onSubmit={ addCityToArray }>

                <div className='input-container'>
                    <input onChange={(e) => setInputCity(e.target.value)} />
                    <button type="submit">Add City</button>
                </div> 

                {/* Render realtime */}
                <div>
                    <h2>You're adding: {inputCity || "___"}</h2>
                </div>

            </form>
        </div>
        </>
    )
}

/////////////////////////////////////
// Gather everything under MyApp
/////////////////////////////////////
function MyApp() {

    const [city, setCity] = useState(CITIES[0])

    return (
        <>
        <AddCity />

            <div className='container'>
                <h2>2. Dropdown with Cities</h2>           
                <select onChange={(e) => setCity(e.target.value)}>
                    {CITIES.map(item => <option key={item}>{item}</option>)}
                </select>
                <p className='results'>Selected { city }</p>
            </div>
           
        </>
    )
}

export default MyApp