import { useState } from 'react'
import './App.css'


function AddNumber({ numberState, setNumberState }) {

  return(

    <div>

      <h1>The number is { numberState }</h1>

      <button 
        onClick={() => setNumberState(oldNumber => oldNumber + 1)
        }>
        +
      </button>

    </div>

  )
}


function App() {
  const [count, setCount] = useState(0)

  const [ numberState, setNumberState ] = useState(0)

  return (
    <>

      <AddNumber
      numberState={ numberState }
      setNumberState={ setNumberState }
      />

      <h1> { numberState } </h1>

      <section id="center">
        
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          + Count is {count}
        </button>

        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count - 1)}
        >
          - Count is {count}
        </button>

      </section>
    </>
  )
}

export default App
