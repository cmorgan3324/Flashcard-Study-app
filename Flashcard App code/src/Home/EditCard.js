import React, { useState, useEffect } from "react";
import { readCard, readDeck, updateCard } from "../utils/api";
import { Link, useHistory, useParams } from "react-router-dom";
import CardForm from "./CardForm";

function EditCard() {
  const [currentDeck, setCurrentDeck] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  const [error, setError] = useState(undefined);

  // const [front, setFront] = useState("");
  const handleFrontChange = (event) =>
    setCurrentCard({
      ...currentCard,
      front: event.target.value,
    });

  // const [back, setBack] = useState("");
  const handleBackChange = (event) =>
    setCurrentCard({
      ...currentCard,
      back: event.target.value,
    });

  const history = useHistory();

  console.log(useParams());
  const deckId = useParams().deckId;
  const cardId = useParams().cardId;

  // console.log(id);
  // console.log(deckId);
  //const deckId = currentDeck.id;

  useEffect(() => {
    const abortController = new AbortController();

    readDeck(deckId, abortController.signal)
      .then(setCurrentDeck)
      .catch(setError);

    return () => abortController.abort();
  }, []);

  console.log(currentDeck);

  useEffect(() => {
    const abortController = new AbortController();

    readCard(cardId, abortController.signal)
      .then(setCurrentCard)
      .catch(setError);

    return () => abortController.abort();
  }, []);

  const { id } = currentCard;
  console.log(id);
  console.log(deckId);
  // console.log(currentCard);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted:", currentCard);
    try {
      let newCard = await updateCard(currentCard);
      console.log(newCard);
      // setFront("");
      // setBack("");
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