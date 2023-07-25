import React, { useState, useEffect } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { listDecks } from "../utils/api";
import DeckList from "./DeckList";

function Home() {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);

  // Load list of decks
  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal).then(setDecks).catch(setError);
    return () => abortController.abort();
  }, []);
  if (error) {
    return null;
  }

  return (
    <div>
      <Link to="/decks/new">
        <button className="btn btn-secondary">+ Create Deck</button>
      </Link>
      <br />
      <br />
      <div>
        <DeckList decks={decks} />
      </div>
    </div>
  );
}

export default Home;
