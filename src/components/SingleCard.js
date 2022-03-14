import './SingleCard.css'

// take in prop
export default function SingleCard({ card, handleChoice, flipped, disabled }) {
    // handleClick for card
    const handleClick = () => {
        // check if not disabled
        if (!disabled) {            
            // access to card and handleChoice as props form App.js
            handleChoice(card)
        }
    }
    return (
        <div className="card">
            {/* if flipped true, apply flipped class */}
            <div className={flipped ? "flipped" : ""}>
                {/* front of card */}
                <img className="front" src={card.src} alt="card front" />
                {/* back of card */}
                <img className="back" src="/img/pac-man-logo.png" onClick={handleClick} alt="cover" />
            </div>
        </div>
    )
}