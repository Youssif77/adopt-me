import { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import ThemeContext from "./theme-context";
import SearchParams from "./SearchParams";
import Details from "./Details";

const App = () => {
  const theme = useState("darkblue");
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <Router>
          <header>
            <Link to="/">
              <h1>Adopt Me</h1>
            </Link>
          </header>
          <Route path="/details/:id" component={Details} />
          <Route path="/" exact component={SearchParams} />
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
