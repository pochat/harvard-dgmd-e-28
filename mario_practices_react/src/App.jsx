import { useState } from 'react'
import './App.css'


function TestingProps(props) {

  return(
    <>
     <h2>Testing props: {props.lastName.toUpperCase()}</h2>
    </>
  )
}

function ToUpperCase({name}) {

  return(
    <div>
      <h2>Name in uppercase: {name.toUpperCase()}</h2>
    </div>
  )
}


function TryMap ( { arrayToMap } ) {

  const transformedArray = arrayToMap.map(index => index + 1)

  return(
    <div>
        <h2>Transformed array: { transformedArray }</h2>
    </div>
  )

}

function TryReduce( { myArray }) {


  const result = myArray.reduce((currentNumber, added) => {
    return currentNumber + added
  }, 0)

  return(

    <div>
        <h2>The sum is: { result }</h2>
        <hr style={ { border: '0.5px solid gray' } }/>
    </div>

  )

}


function AddNumber({ numberState, setNumberState }) {

  return(

    <div>

      <h2>The number is { numberState }</h2>

      <button 
        onClick={() => setNumberState(oldNumber => oldNumber + 1)
        }>
        +
      </button>

      <hr style={ { border: '0.5px solid gray' } }/>

    </div>

  )
}


function App() {
  const [count, setCount] = useState(0)

  const [ numberState, setNumberState ] = useState(0)

  return (
    <>

      <h2>Reduce method:</h2>
      <TryReduce myArray={[1,2,3,4]}/>
      <TryMap  arrayToMap={[1,2,3,4]}/>
      <ToUpperCase name="Sonia" />
      <TestingProps lastName="Pochat" />

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
