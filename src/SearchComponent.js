import { useState } from "react";

function SearchComponent({ history, setHistory }) {
  const [searchInput, setSearchInput] = useState("");
  const [definition, setDefinition] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput}`
      );

      const result = await response.json();

      if (result.message) {
        setErrorMessage(result.message);
      }

      const description = result[0].meanings[0].definitions[0].definition;
      setDefinition(description);

      setHistory([...history, { word: searchInput, description: description }]);
      localStorage.setItem("searchHistory", JSON.stringify(history));

      setError(false);
      console.log(`User searched for a definition of a word: ${searchInput}`);
    } catch (e) {
      setError(true);
    }
  };

  return (
    <div className="search-component">
      {error && <h5 className="error">{errorMessage}</h5>}
      <form onSubmit={handleSubmit}>
        <input
          className={`${error && "error"}`}
          type="text"
          maxLength="50"
          placeholder="Enter text..."
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <button type="submit ">Search</button>
      </form>

      {definition && (
        <div className="definition">
          <h4>Definition: {definition}</h4>
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
