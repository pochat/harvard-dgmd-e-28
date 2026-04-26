import { useState } from 'react'
import './App.css'

function MyApp() {
    

    const [theName, setName] = useState("Joe")

    return (
        <>
           <h1>State Demo</h1>
           <form action="">
            Say hello to:
            <input type = 'text' name='name1' onChange = {(e) => setName(e.target.value)} />
           </form>
           <p>Greetings, { theName }!</p>
           
        </>
    )
}

export default MyApp