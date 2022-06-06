import { useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Playlist from "./components/Playlist/Playlist";
import SavedTracks from './components/SavedTracks/savedTracks';

import Login from "./pages/Login";
import Container from "./components/Container/Container";
import { context } from "./context/context";
import Home from "./pages/Home";
import SearchResults from "./components/SearchResults/SearchResults";
import Album from "./components/Album/Album";

export default function App() {

  const {
    tokenIsSet,
  } = useContext(context);

  return (
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
        <Route path={"/savedtracks"}>
          <Container>
            <SavedTracks />
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
  );
}
