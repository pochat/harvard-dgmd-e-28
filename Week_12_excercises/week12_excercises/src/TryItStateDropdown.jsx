import { useState } from 'react'
import './App.css'


function Option({cityval}) {

    return(
        <>
            <option>{ cityval }</option>
        </>

    )

}


function MyApp() {
    
    
    const cities = ['Boston', 'Vancouver', 'Dehli', 'Mexico']

    const [theCity, setCity] = useState(cities[0])

    return (
        <>
           <h1>Dropdown Demo</h1>
           
           <select onChange={setCity = e.target.value}>


                    {cities.map(item => <Option cityval={ item }/>)}


           </select>
           
        </>
    )
}

export default MyApp