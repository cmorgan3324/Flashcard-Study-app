import React, { useState, useEffect } from "react";
import { createCard, readDeck } from "../utils/api";
import { Link, useHistory, useParams } from "react-router-dom";
import CardForm from "./CardForm";

function AddCard() {
  const [currentDeck, setCurrentDeck] = useState([]);
  const [error, setError] = useState(undefined);

  const [front, setFront] = useState("");
  const handleFrontChange = (event) => setFront(event.target.value);

  const [back, setBack] = useState("");
  const handleBackChange = (event) => setBack(event.target.value);

  const history = useHistory();

  const deckId = useParams().deckId;

// Load deck
  useEffect(() => {
    console.log("readDeckEffect");
    const abortController = new AbortController();

    readDeck(deckId, abortController.signal)
      .then(setCurrentDeck)
      .catch(setError);

    return () => abortController.abort();
  }, []);

  // Submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted:", front, back);
    try {
      let newCard = await createCard(
        deckId,
        { front, back }
      );
      setFront("");
      setBack("");
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
            <Link to={`/decks/${deckId}`}>{currentDeck.name}</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>

      <h1>{`${currentDeck.name}: Add Card`}</h1>
      <CardForm
        deckId={deckId}
        front={front}
        back={back}
        handleFrontChange={handleFrontChange}
        handleBackChange={handleBackChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default AddCard;
