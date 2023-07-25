import React, { useState, useEffect } from "react";
import Deck from "./Deck";
import { Link } from "react-router-dom";

function DeckList({ decks }) {
  const list = decks.map((deck) => <Deck key={deck.id} deck={deck} />);
  //console.log(list);

  return (
    <div>
      <main className="container">
        <section className="row">{list}</section>
      </main>
    </div>
  );
}

export default DeckList;
