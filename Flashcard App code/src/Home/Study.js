
import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";
import { readCard } from "../utils/api";


function Study() {
  const initialFormState = {
    front: "",
    back: "",
  };
  const [content, setContent] = useState({ ...initialFormState });
  const [deck, setDeck] = useState({ cards: [] }); // Initialize deck to empty deck of cards
  const [card, setCard] = useState({ ...initialFormState });
  const [cardIndex, setCardIndex] = useState(0);
  const [isFront, setIsFront] = useState([]);
  
  const history = useHistory();
  const { deckId } = useParams();

  // Load deck
  useEffect(() => {
    async function getDeck() {
      const deck = await readDeck(deckId);
      setDeck(deck);
      setCard(deck.cards[0]);
    }
    getDeck();
  }, [deckId]);

  // Flip button handler
  const handleFlip = async (id) => {
    setIsFront((currentValue) => !currentValue);
    return;
  };

  //Next button handler; need to increment card index
  const handleNext = async (id) => {
    setCardIndex((currentValue) => currentValue + 1);
    setIsFront(true);
    setCard(deck.cards[cardIndex + 1]);
    
    if (cardIndex === deck.cards.length - 1) {
      const result = window.confirm("Restart cards?");
      
      if (result) {
        setCardIndex(0);
        setIsFront(true);
        setCard(deck.cards[0]);
      } else {
        return history.push("/");
      }
    }

    return;
  };

  // Add card button handler
  const handleAddCards = async (id) => {
    return history.push(`/decks/${deck.id}/cards/new`);
  };

  if (deck.cards.length > 2) {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name} </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <div className="border p-4 h-100 d-flex flex-column">
          <div>
            <h6>
              {" "}
              Card {cardIndex + 1} of {deck.cards.length}{" "}
            </h6>
            <h3 className="display-6 mb-6">Study: {deck.name}</h3>
          </div>
          <p>{isFront ? card.front : card.back}</p>
          <div className="d-grid gap-6 d-md-block">
            <button className="btn btn-secondary" onClick={() => handleFlip()}>
              Flip
            </button>
            {!isFront && (
              <button className="btn btn-primary" onClick={() => handleNext()}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name} </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>

        <div className="border p-4 h-100 d-flex flex-column">
          <div>
            <h3 className="display-6 mb-6">{deck.name}: Study</h3>
          </div>
          <h6> Not enough cards!</h6>
          <p>
            You need at least 3 cards to study. There are {deck.cards.length}{" "}
            cards in this deck
          </p>

          <div className="d-grid gap-6 d-md-block">
            <button
              className="btn btn-primary"
              onClick={() => handleAddCards()}
            >
              Add Card
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Study;
