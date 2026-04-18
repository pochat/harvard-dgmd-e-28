import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


function Title() {
  return (

    <div className='title'>
      <h1>Worlde Redux Part 2</h1>
      <p>DGMD-28 | Using Vite</p>
    </div>
  )
}

function Block( {number, color} ) {
  return(

    <div className={`block ${color}`}>

      { number }

    </div>
  
  )
}

function Group() {
  return(
    <div className='container'>
      <Block number={7} color="black" />
      <Block number={8} color="blue" />
      <Block number={9} color="red" />
      <Block number={4} color="yellow" />
      <Block number={5} color="black" />
      <Block number={6} color="blue" />
      <Block number={1} color="red" />
      <Block number={2} color="yellow" />
      <Block number={3} color="black" />
    </div>
  )
}


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
