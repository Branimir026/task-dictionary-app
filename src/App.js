import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import SearchComponent from "./SearchComponent";
import History from "./History";

function App() {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("searchHistory") === null) {
      localStorage.setItem("searchHistory", JSON.stringify([]));
    } else {
      let localSearchHistory = JSON.parse(
        localStorage.getItem("searchHistory")
      );
      setSearchHistory(localSearchHistory);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li>
              <Link to="/">DICTIONARY APP</Link>
            </li>
            <li>
              <Link to="/history">SEARCH HISTORY</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/history">
            <History history={searchHistory} />
          </Route>
          <Route path="/">
            <SearchComponent
              history={searchHistory}
              setHistory={setSearchHistory}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
