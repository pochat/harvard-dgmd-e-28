import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import './App.css'
import MyApp from './guess'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <MyApp />
    </Router>
  )
}

export default App
