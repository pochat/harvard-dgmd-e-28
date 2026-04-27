import { useState } from 'react'
import './App.css'


/////////////////////////////////////
// Add city after user input - Component
/////////////////////////////////////
function AddCity({ onAdd }) {

    // Hook for new city from the input
    const [inputCity, setInputCity] = useState('')

    // Logic for the input value
    function addCityToArray(e) {

        // prevent browser from reloading the page
        e.preventDefault();

        // Calls addCity from MyApp()
        onAdd(inputCity)

        // debug
        console.log("Handle guess value:", setInputCity);
        
    }

    return(
        <>
        <div className='container'>
            {/* Title */}
            <h2>Step 1: Add a city</h2>           

            {/* Input form starts: onSubmit calls addCityToArray when button is clicked */}
            <form method="post" onSubmit={ addCityToArray }>

                <div className='input-container'>
                    {/* onChange renders after every keypress and updates inputCity state */}
                    <input onChange={(e) => setInputCity(e.target.value)} />

                    {/* type="submit" triggers the form's onSubmit event */}
                    <button type="submit">Add City</button>
                </div> 

                {/* Displays inputCity state in realtime as user types */}
                {/* If inputCity is empty, show "___" as a placeholder */}
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

    // Set the original hooks
    const [cities, setCities] = useState(['Boston', 'Vancouver'])
    
    // const [city, setCity] = useState(CITIES[0])
    // Tracks which city is selected in the dropdown
    const [city, setCity] = useState('Boston') // first in menu

    // Function that adds new city to cities array
    // Like a push, but more like merge/concat
    function addCity(newCity) {
        setCities([...cities, newCity])
    }
    
    return (
        <>

        {/* Prop for function AddCity({ onAdd }) */}
        <AddCity onAdd={addCity} />
            <div className='container'>
                <h2>2. Dropdown with Cities</h2>           
                <select onChange={(e) => setCity(e.target.value)}>
                    {cities.map(item => <option key={item}>{item}</option>)}
                </select>
                <p className='results'>Selected { city }</p>
            </div>
           
        </>
    )
}

export default MyApp