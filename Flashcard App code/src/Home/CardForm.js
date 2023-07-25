import React from "react";
import { Link } from "react-router-dom";

function CardForm({
  deckId,
  front,
  back,
  currentCard,
  handleFrontChange,
  handleBackChange,
  handleSubmit,
}) {
  if (currentCard) {
    return (
      <form>
        <div class="mb-3">
          <label htmlFor="name" class="form-label">
            Front:
          </label>
          <textarea
            type="text"
            class="form-control"
            id="front"
            onChange={handleFrontChange}
            value={currentCard.front}
            // placeholder={`${currentCard.front}`}
          />
        </div>
        <div class="mb-3">
          <label htmlFor="description" class="form-label">
            Back:
          </label>
          <textarea
            type="text"
            class="form-control"
            id="back"
            onChange={handleBackChange}
            value={currentCard.back}
            // placeholder={`${currentCard.back}`}
          />
        </div>
        <div>
          <Link to={`/decks/${deckId}`}>
            <button className="btn btn-secondary" type="submit">
              Done
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
    );
  } else {
    return (
      <form>
        <div class="mb-3">
          <label htmlFor="name" class="form-label">
            Front:
          </label>
          <textarea
            type="text"
            class="form-control"
            id="front"
            onChange={handleFrontChange}
            value={front}
            placeholder="Front side of card"
          />
        </div>
        <div class="mb-3">
          <label htmlFor="description" class="form-label">
            Back:
          </label>
          <textarea
            type="text"
            class="form-control"
            id="back"
            onChange={handleBackChange}
            value={back}
            placeholder="Back side of card"
          />
        </div>
        <div>
          <Link to={`/decks/${deckId}`}>
            <button className="btn btn-secondary" type="submit">
              Done
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
    );
  }
}

export default CardForm;
