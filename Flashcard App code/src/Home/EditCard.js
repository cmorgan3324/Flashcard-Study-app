import React, { useState, useEffect } from "react";
import { readCard, readDeck, updateCard } from "../utils/api";
import { Link, useHistory, useParams } from "react-router-dom";
import CardForm from "./CardForm";

function EditCard() {
  const [currentDeck, setCurrentDeck] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  const [error, setError] = useState(undefined);
  
  const history = useHistory();
  const deckId = useParams().deckId;
  const cardId = useParams().cardId;
  const { id } = currentCard;
  
// Front of card change handler
  const handleFrontChange = (event) =>
    setCurrentCard({
      ...currentCard,
      front: event.target.value,
    });

  // Back of card change handler
  const handleBackChange = (event) =>
    setCurrentCard({
      ...currentCard,
      back: event.target.value,
    });

 // Load deck 
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setCurrentDeck)
      .catch(setError);
    return () => abortController.abort();
  }, []);

// Load card
  useEffect(() => {
    const abortController = new AbortController();
    readCard(cardId, abortController.signal)
      .then(setCurrentCard)
      .catch(setError);
    return () => abortController.abort();
  }, []);

  // Submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted:", currentCard);
    try {
      let newCard = await updateCard(currentCard);
      console.log(newCard);
      history.push(`/decks/${deckId}`);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item" aria-current="page">
            <Link to={`/decks/${deckId}`}>Deck {currentDeck.name}</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
      <CardForm
        deckId={deckId}
        currentCard={currentCard}
        handleFrontChange={handleFrontChange}
        handleBackChange={handleBackChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default EditCard;
