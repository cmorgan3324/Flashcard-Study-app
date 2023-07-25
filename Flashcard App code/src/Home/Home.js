import React, { useState, useEffect } from "react";
//import Deck from "./Deck";
import DeckList from "./DeckList";
// import ReadDeck from "./ReadDeck";
//import CreateDeck from "./CreateDeck";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { listDecks } from "../utils/api";
// import CreateDeckForm from "./CreateDeckForm";

function Home() {
  const [decks, setDecks] = useState([]);
  // const [cards, setCards] = useState([]);
  const [error, setError] = useState(undefined);
  // console.log(decks);
  //console.log(cards);
  // const { url } = useRouteMatch();

  // const history = useHistory();

  useEffect(() => {
    // console.log("listEffect");
    const abortController = new AbortController();

    listDecks(abortController.signal).then(setDecks).catch(setError);
    //setDecks([cards]);
    return () => abortController.abort();
  }, []);

  if (error) {
    return null;
  }

  //console.log(decks);

  return (
    <div>
      {/* <CreateDeckForm decks={decks} setDecks={setDecks} history={history} /> */}

      <Link to="/decks/new">
        <button className="btn btn-secondary">+ Create Deck</button>
      </Link>
      <br />
      <br />
      <div>
        <DeckList decks={decks} />
      </div>
      {/* <ReadDeck
        decks={decks}
        setDecks={setDecks}
        history={history}
        cards={cards}
        setCards={setCards}
      /> */}
    </div>
  );
}

export default Home;
