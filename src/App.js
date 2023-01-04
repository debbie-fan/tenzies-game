import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Die from './components/Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {
  // Create state for all ten dice
  const [dice, setDice] = useState(allNewDice())  
  // Create state to represent if user has won the game or not
  const [tenzies, setTenzies] = useState(false)

  // Create effect that runs when dice state array changes to check for win condition
  useEffect(() => {
    const firstNumber = dice[0].value;
    const allHeld = dice.every(die => die.isHeld)
    const allSameValue = dice.every(die => die.value == firstNumber)
    // check for win condition
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  // Generate info for one die object
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  // Create an array of 10 objects representing the 10 dice
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice[i] = generateNewDie()
    }
    return newDice
  }
  
  // Roll the dice that are not "held", aka the white dice
  // Reset game if win conditions were met
  function rollDice() {
    if (!tenzies) {
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld === true ?
        die : 
        generateNewDie()
      }))
    } 
    else {
      setTenzies(false) 
      setDice(allNewDice())
  }
  }

  // Update dice array isHeld value for any dice that are frozen/held
  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? 
        {...die, isHeld: !die.isHeld} : 
        die
    }))
  }

  // Create an array of the ten dice components to be rendered
  const diceElements = dice.map(die => (
    <Die 
      key={die.id} 
      value={die.value} 
      isHeld={die.isHeld} 
      holdDice={() => holdDice(die.id)}
    />
  ))

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button 
        className='button-roll'
        onClick={rollDice}
      >
          {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
