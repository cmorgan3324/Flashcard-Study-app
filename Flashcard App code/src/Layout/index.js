import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home/Home";
//import DeckList from "../Home/DeckList";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Study from "../Home/Study";
import CreateDeckForm from "../Home/CreateDeckForm";
import ReadDeck from "../Home/ReadDeck";
import AddCard from "../Home/AddCard";
import EditCard from "../Home/EditCard";
import EditDeck from "../Home/EditDeck";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeckForm />
          </Route>
          <Route exact path="/decks/:deckId">
            <ReadDeck />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact path="/decks/:deckId/:cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
