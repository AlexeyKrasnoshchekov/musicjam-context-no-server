import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Playlist from "./components/Playlist/Playlist";

import Login from "./pages/Login";
import Container from "./components/Container/Container";
import { context } from "./store/context";
import Home from "./pages/Home";
import SearchResults from "./components/SearchResults/SearchResults";
import Album from "./components/Album/Album";

export default function App() {
  // const [accessToken, setAccessToken] = useState("");
  // const [tokenIsSet, setTokenIsSet] = useState(false);

  const {
    tokenIsSet,
    // getToken,
    // logout,
  } = useContext(context);

  return (
    // <apiContext.Provider value={spotifyApi}>
    <Router>
      <Switch>
        <Route path={"/album/:id"}>
          <Container>
            <Album />
          </Container>
        </Route>
        <Route path={"/playlist"}>
          <Container>
            <Playlist />
          </Container>
        </Route>
        <Route path={"/search"}>
          <Container>
            <SearchResults />
          </Container>
        </Route>
        <Route path={"/"}>
          <div className="App">{tokenIsSet ? <Home /> : <Login />}</div>
        </Route>
      </Switch>
    </Router>
    // </apiContext.Provider>
  );
}
