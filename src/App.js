import { useState, useEffect } from 'react'
import './App.css';
import SingleCard from './components/SingleCard';

// Array of Cards
const cardImages = [
  { "src": "/img/inky.png", matched: false },
  { "src": "/img/blinky.png", matched: false },
  { "src": "/img/pinky.png", matched: false },
  { "src": "/img/clyde.png", matched: false },
  { "src": "/img/pac-man.png", matched: false },
  { "src": "/img/mrs-pac-man.png", matched: false }
]
function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  // set state for choice
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  // disabled state
  const [disabled, setDisabled] = useState(false)

  /*
    Duplicate each card once, shuffle cards, 
    and assign random ID to each card
  */
  const shuffleCards = () => {
    // spread cardImages twice to create duplicates
    const shuffledCards = [...cardImages, ...cardImages]
      // when negative, cards remain same, when positive cards get switched around
      .sort(() => Math.random() - 0.5)
      // take in card properties and map to new array and add new ID
      .map(card => ({ ...card, id: Math.random() }))
    setChoiceOne(null)
    setChoiceTwo(null)
    // update setCards state
    setCards(shuffledCards)
    // update setTurns state to 0
    setTurns(0)
  }
  // handle card choice
  const handleChoice = (card) => {
    // if choiceOne does NOT have value, update choiceOne
    // else update choiceTwo
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  // compare choiceOne & choiceTwo
  useEffect(() => {
    // check only when both choices selected
    if (choiceOne && choiceTwo) {
      setDisabled(true)
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

  // Start game automatically
  useEffect(() => {
    shuffleCards()
  },[])
  // reset card choices and increment turn value
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  return (
    <div className="App">
      <h1>Pac-Man Match</h1>
      <button className='button' onClick={shuffleCards}>New Game</button>
      <p>Turns: {turns}</p>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
