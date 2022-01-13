
import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';


const cardImages = [
  { "src": "/img/2646.jpeg", matched: false },
  { "src": "/img/2651.jpeg", matched: false },
  { "src": "/img/2652.jpeg", matched: false },
  { "src": "/img/2657.jpeg", matched: false },
  { "src": "/img/2658.jpeg", matched: false },
  { "src": "/img/2665.jpeg", matched: false },
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
      <p className='copyright'>Copyright Dansk Boldspil-Union &copy;</p>
    </div>
  );
}

export default App;
