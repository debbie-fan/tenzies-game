import React from 'react';
import Die from './components/Die';
import {nanoid} from 'nanoid';

function App() {
  // New state for all ten dice
  const [dice, setDice] = React.useState(allNewDice())

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
  function rollDice() {
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld === true ?
        die : 
        generateNewDie()
    }))
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
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button 
        className='button-roll'
        onClick={rollDice}
      >
          Roll
      </button>
    </main>
  );
}

export default App;
