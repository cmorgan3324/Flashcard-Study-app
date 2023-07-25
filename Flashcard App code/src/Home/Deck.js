import React, { useState } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function Deck({ deck }) {
  const [cards, setCards] = useState([]);
  const { url } = useRouteMatch();
  const history = useHistory();

  // Delete handler
  const deleteHandler = async () => {
    const result = window.confirm("Delete this deck?");
    if (result === true) {
      await deleteDeck(deck.id);
      history.push("/");
    }
  };

  return (
    <div className="card w-75">
      <div className="card-body">
         <h5 className="card-title">
          {deck.name}
        </h5>
        <p>{deck.cards.length} cards</p>
        <p className="card-text">{deck.description}</p>
        <div className="d-flex bd-highlight mb-3">
          <div className="p-2 bd-highlight">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => history.push(`/decks/${deck.id}`)}
            >
              View
            </button>
          </div>
          <div className="p-2 bd-highlight">
            <Link to={`/decks/${deck.id}/study`}>
              <button className="btn btn-primary" type="button">
                Study
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
      </div>
    </div>
  );
}

export default Deck;
