import React, { useState, useEffect } from "react";
import { readDeck, deleteDeck } from "../utils/api";
import { Link, useParams, useRouteMatch, useHistory } from "react-router-dom";
import CardList from "./CardList";

function ReadDeck() {
  const [currentDeck, setCurrentDeck] = useState(null);
  const [error, setError] = useState(undefined);
  const deckId = useParams().deckId;
  const history = useHistory();

  // Load deck
  useEffect(() => {
    console.log("readDeckEffect");
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setCurrentDeck)
      .catch(setError);
    return () => abortController.abort();
  }, []);

  // Delete handler
  const deleteHandler = async () => {
    const result = window.confirm("Delete this deck?");
    if (result === true) {
      await deleteDeck(currentDeck.id);
      history.push("/");
    }
  };
  
  if (!currentDeck) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {currentDeck.name}
          </li>
        </ol>
      </nav>
      <h3>{currentDeck.name}</h3>
      <p>{currentDeck.description}</p>
      <div className="d-flex bd-highlight mb-3">
        <div className="p-2 bd-highlight">
          <Link to={`/decks/${currentDeck.id}/edit`}>
            <button className="btn btn-secondary" type="button">
              Edit
            </button>
          </Link>
        </div>
        <div className="p-2 bd-highlight">
          <Link to={`/decks/${currentDeck.id}/study`}>
            <button className="btn btn-primary" type="button">
              Study
            </button>
          </Link>
        </div>
        <div className="p-2 bd-highlight">
          <Link to={`/decks/${currentDeck.id}/cards/new`}>
            <button className="btn btn-primary" type="button">
              + Add cards
            </button>
          </Link>
        </div>
        <div class="ms-auto p-2 bd-highlight">
          <Link to="/">
            <button onClick={deleteHandler} class="btn btn-danger">
              Delete
            </button>
          </Link>
        </div>
      </div>
      <CardList currentDeckCards={currentDeck.cards} />
    </div>
  );
}

export default ReadDeck;
