import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeckForm() {
  //const { url, path } = useRouteMatch();

  //console.log(useRouteMatch());
  //console.log(decks);

  const history = useHistory();
  const [name, setName] = useState("");

  const handleNameChange = (event) => setName(event.target.value);

  const [description, setDescription] = useState("");
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  // const lastDeck = decks[decks.length - 1];

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted:", name, description);
    try {
      let newDeck = await createDeck({ name, description });
      // console.log(decks);
      console.log(newDeck);
      // console.log(newDeck.id);
      // setDecks([...decks, newDeck]);
      //console.log(setDecks([newDeck]));
      setName("");
      setDescription("");
      history.push(`/decks/${newDeck.id}`);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <br />
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>

      <h1>Create Deck</h1>
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
            value={name}
            placeholder="Enter deck name"
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
            value={description}
            placeholder="Enter deck description"
          />
        </div>
        <div>
          <Link to="/">
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
    </div>
  );
}

export default CreateDeckForm;

