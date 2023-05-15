import './app.css'
import Die from './Die';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'
import TenziesAudio from './audio/Mortuna Avenue.m4a'

function App() {

  const [die, setDie] = useState(newDie());
  const [won, setWon] = useState(false); 

  function newDie() {
    const dieArray = []
     for(let i = 0; i < 10; i++) {
      const dieNum = Math.floor(Math.random() * 6) + 1;
      dieArray.push({
        id: nanoid(),
        value: dieNum,
        isChosen: false
      })
    }
    return dieArray;
  }

  function rollDice() {
    if (!won) {
    setDie(prevDie => prevDie.map(die => {
      return die.isChosen ? die : {
        id: nanoid(),
        value: Math.floor(Math.random() * 6) + 1,
        isChosen: false
      }
    }))}
    else {
      setWon(false);
      setDie(newDie());
    }
  }

  function chosen(id) {
    setDie(prevDie => prevDie.map(die => {
      return die.id === id ? {...die, isChosen: !die.isChosen} : die;
    }))
  }

  useEffect(() => {
    const allChosen = die.every(die => die.isChosen);
    const val = die[0].value;
    const allSame = die.every(die => val === die.value)
    if(allChosen && allSame) {
      setWon(true);
    }
  }, [die])


  const dice = die.map((die) => {
    return <Die 
    key={die.id} 
    value={die.value}
    isChosen={die.isChosen}
    chosen={() => chosen(die.id)}
    />
  })

return (
    <main>
      {
        won && <Confetti
          />
      }
      {
        won && (
          <audio src={TenziesAudio} autoPlay></audio>
        )
      }
      <h1>Tenzies</h1>
      <p>Roll dice until you are able to hold the same <strong>10</strong> numbers! <br /> 
        Click dice to hold!
      </p>
      <div className='dice-container'>
        {dice}
      </div>
      <button onClick={rollDice} className='roll-dice'>{won ? 'New Game' : 'Roll Dice'}</button>
    </main>
  );
}


export default App;
