import React from "react"
import Die from "./Component/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  
  React.useEffect(() => {
      const allHeld = dice.every(die => die.isHeld)
      const firstValue = dice[0].value
      const allSameValue = dice.every(die => die.value === firstValue)
      if (allHeld && allSameValue) {
          setTenzies(true)
      }
  }, [dice])

  function generateNewDie() {
      return {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
      }
  }
  
  function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
          newDice.push(generateNewDie())
      }
      return newDice
  }
  
/**
* Challenge: Allow the user to play a new game when the
* button is clicked and they've already won
*/
  
  function rollDice() {
      if(!tenzies) {
          setDice(oldDice => oldDice.map(die => {
              return die.isHeld ? 
                  die :
                  generateNewDie()
          }))
      } else {
          setTenzies(false)
          setDice(allNewDice())
      }
  }
  
  function holdDice(id) {
      setDice(oldDice => oldDice.map(die => {
          return die.id === id ? 
              {...die, isHeld: !die.isHeld} :
              die
      }))
  }
  
  const diceElements = dice.map(die => (
      <Die 
          key={die.id} 
          value={die.value} 
          isHeld={die.isHeld} 
          holdDice={() => holdDice(die.id)}
      />
  ))
  function toggleMode() {
    const mode = document.querySelector(".mode-toggle")
    const body = document.querySelector("body")
    if(mode.classList.contains("to-light")) {
      body.classList.add("dark-mode")
      body.style.background = "#0B2434";
      mode.classList.remove("to-light")
      mode.classList.add("to-dark")
    } else {
      body.classList.remove("dark-mode")
      body.style.background = "#a5c0d1db";
      mode.classList.remove("to-dark")
      mode.classList.add("to-light")      
    }
    
  }
  return (
      <main>
          {tenzies && <Confetti 
          width="680%"
          />}
          <p className="react-badge">Learning-React-6 </p>
          <div className="light-dark-container">
          <i className="fa-solid fa-sun"></i>
              <div className="mode-toggle to-light" onClick={toggleMode}>
                <div className="mode-dark-toggle"></div>
              </div>
          <i className="fa-solid fa-moon"></i>
          </div>
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. 
          Click each die to freeze it at its current value between rolls.</p>
          <div className="dice-container">
              {diceElements}
          </div>
          <button 
              className="roll-dice" 
              onClick={rollDice}
          >
              {tenzies ? "New Game" : "Roll"}
          </button>
      </main>
  )
}