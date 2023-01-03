import React from 'react';
import Die from './components/Die';
import {nanoid} from 'nanoid';

function App() {
  const [dice, setDice] = React.useState(allNewDice())

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice[i] = {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }
    }
    return newDice
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? 
      {...die, isHeld: !die.isHeld} : 
      die
    }))
  }

  function rollDice() {
    setDice(allNewDice())
  }

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
