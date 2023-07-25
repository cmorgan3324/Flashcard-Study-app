import React from "react";
import Card from "./Card";

function CardList({ currentDeckCards }) {
  // const currentDeckCards = cards.filter(
  //   (card) => currentDeck.id == card.deckId
  // );
  console.log(currentDeckCards);

  const cardList = currentDeckCards.map((card) => (
    <Card key={card.id} card={card} />
  ));

  return (
    <div>
      <h2>Cards</h2>
      <main className="container">
        <section className="row">{cardList}</section>
      </main>
    </div>
  );
}

export default CardList;
