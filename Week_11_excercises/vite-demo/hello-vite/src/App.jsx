// This is the first project with Vite
// The purpose is to understand how an SPA works
// Each block takes a number and a class color

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


// Title and subtitle of the project
function Title() {

  // No logic, just text
  return (
    <div className='title'>
      <h1>Worlde Redux Part 2</h1>
      <p>DGMD-28 | Using Vite 😀</p>
    </div>
  )
}

// This component takes two parameters that can be
// dynamically changed while invoked
function Block( {number, color} ) {

  // This alert tells the user what block number they clicked on
  let pick = () => {
    alert("You picked: " + number )
  }

  // Render the results on webpage
  return(

    // Don't forget to call the alert using onClick
    <div className={`block ${ color }`} onClick={ pick }>

      { number }

    </div>
  
  )
}

// Creates a group of all components
function Group() {

  // No logic, just return the html

  return(
    <div className='container'>
      <Block number={7} color="black" />
      <Block number={8} color="blue" />
      <Block number={9} color="salmon" />
      <Block number={4} color="yellow" />
      <Block number={5} color="black" />
      <Block number={6} color="blue" />
      <Block number={1} color="salmon" />
      <Block number={2} color="yellow" />
      <Block number={3} color="black" />
    </div>
  )
}

// App is the main function that gathers all components
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Title />
      <Group />
    </div>
  )
}

export default App
