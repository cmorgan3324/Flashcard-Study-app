import React, { useEffect, useState } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { deleteCard, readCard } from "../utils/api";
import EditCard from "./EditCard";

function Card({ card }) {
  //const [cards, setCards] = useState([]);
  const [error, setError] = useState(undefined);
  const { url } = useRouteMatch();
  // console.log(useRouteMatch());
  //const deckOfCards = cards.filter((card) => deck.id === card.deckId);
  //console.log(deckOfCards);
  //console.log(card);
  const history = useHistory();

  const deleteHandler = async () => {
    const result = window.confirm("Delete this card?");
    //console.log(result);
    if (result === true) {
      await deleteCard(card.id);
      history.go(0);
    }
  };

  useEffect(() => {
    //console.log("UseEffect");
    const abortController = new AbortController();

    readCard(card.id, abortController.signal).catch(setError);

    return () => abortController.abort();
  }, []);

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <p className="card-text">{`${card.front}`}</p>
            </div>
            <div className="col">
              <p className="card-text">{`${card.back}`}</p>
            </div>
          </div>
          <div className="row">
            <div className="col d-flex justify-content-end align-items-end">
              <Link to={`${url}/cards/${card.id}/edit`}>
                <button className="btn btn-secondary m-1">Edit</button>
              </Link>

              <button onClick={deleteHandler} class="btn btn-danger m-1">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
