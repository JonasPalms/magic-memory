
import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

// annoying image imports beceause the build glitched the paths
import maehle from './images/2651.jpeg';
import schmeichel from './images/2646.jpeg';
import dolberg from './images/2665.jpeg';
import pierre from './images/2657.jpeg';
import kjaer from './images/2652.jpeg';
import delaney from './images/2658.jpeg';


const cardImages = [
  { "src": maehle, matched: false },
  { "src": schmeichel, matched: false },
  { "src": dolberg, matched: false },
  { "src": pierre, matched: false },
  { "src": kjaer, matched: false },
  { "src": delaney, matched: false },
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState([0])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisbabled] = useState(false)

  // shuffle cards 
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
    // this shuffling and ID assignment is not optimal but will do for now eh 
    setChoiceTwo(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // handle a choice 

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)

  }

  // compare two selected cards 

  useEffect(() => {

    if (choiceOne && choiceTwo) {
      setDisbabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {

        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  // reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisbabled(false)
  }

  // start a new game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>VEND EN LEGENDE</h1>
      <button onClick={shuffleCards}>Nyt spil</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={
              card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p className="turns"> forsøg: {turns}</p>
      <p className='copyright'>Ophavsret af Dansk Boldspil-Union &copy;</p>

    </div>
  );
}

export default App;
