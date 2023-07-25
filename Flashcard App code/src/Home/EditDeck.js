import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api";

function EditDeck() {
  const [currentDeck, setCurrentDeck] = useState([]);
  const [error, setError] = useState(undefined);
  const deckId = useParams().deckId;
  const { id } = currentDeck;
  
// Name change handler
  const handleNameChange = (event) =>
    setCurrentDeck({
      ...currentDeck,
      name: event.target.value,
    });

  // Description change handler
  const handleDescriptionChange = (event) =>
    setCurrentDeck({
      ...currentDeck,
      description: event.target.value,
    });

  // Load deck
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setCurrentDeck)
      .catch(setError);

    return () => abortController.abort();
  }, []);

// Submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let newDeck = await updateDeck(currentDeck);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <br />
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item" aria-current="page">
            <Link to={`/decks/${deckId}`}>{currentDeck.name}</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <form>
        <div class="mb-3">
          <label htmlFor="name" class="form-label">
            Deck Name:
          </label>
          <input
            type="text"
            class="form-control"
            id="name"
            onChange={handleNameChange}
            value={currentDeck.name}
          />
        </div>
        <div class="mb-3">
          <label htmlFor="description" class="form-label">
            Description:
          </label>
          <textarea
            type="text"
            class="form-control"
            id="description"
            onChange={handleDescriptionChange}
            value={currentDeck.description}
          />
        </div>
        <div>
          <Link to={`/decks/${deckId}`}>
            <button className="btn btn-secondary" type="submit">
              Cancel
            </button>
          </Link>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default EditDeck;
