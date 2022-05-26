import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import SpotifyWebApi from "spotify-web-api-js";

// import Playlist from "../Playlist/Playlist";
// import SearchBar from "../SearchBar/SearchBar";
// import SearchResults from "../SearchResults/SearchResults";
// import { search, savePlaylist, getAccessToken } from "../../util/Spotify";
// import Playlists from "../Playlists/Playlists";
// import { useAppDispatch } from "../../hooks/redux";
// import { loadPlaylists } from "../Playlists/playlistsSlice";
import Login from "../Login/Login";
import Container from "../Container/Container";
import { context } from "../../store/context";
import Playlist from "../Playlist/Playlist";

export default function App() {
  // const [accessToken, setAccessToken] = useState("");
  // const [tokenIsSet, setTokenIsSet] = useState(false);

  // const {
  //   tokenIsSet,
  //   getToken,
  //   // logout,
  // } = useContext(context);
  // const spotifyApi = new SpotifyWebApi();

  // const handleLogin = () => {
  //   token !== "" && auth();
  // };
  // const handleSearch = (searchTerm, types) => {
  //   return spotifyApi.search(searchTerm, types, {
  //     limit: 10,
  //     market: "ES",
  //   });
  // };

  // const handleLogout = () => {
  //   logout();
  // };

  // get Elvis' albums, passing a callback. When a callback is passed, no Promise is returned
  // spotifyApi.getArtistAlbums(
  //   "43ZHCT0cAZBISjO8DG9PnE",
  //   function (err: any, data: any) {
  //     if (err) console.error(err);
  //     else console.log("Artist albums", data);
  //   }
  // );

  // get Elvis' albums, using Promises through Promise, Q or when
  // spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then(
  //   function (data) {
  //     console.log("Artist albums", data);
  //   },
  //   function (err) {
  //     console.error(err);
  //   }
  // );
  // spotifyApi
  //   .getMe() // note that we don't pass a user id
  //   .then(
  //     function (data) {
  //       console.log('User', data);
  //     },
  //     function (err) {
  //       console.error(err);
  //     }
  //   );

  return (
    <Router>
      <Switch>
        <Route path="/home">
          <Container />
        </Route>
        <Route path="/">
          <Login />
          {/* <div className="App">{tokenIsSet ? <Container /> : <Login />}</div> */}
        </Route>
      </Switch>
    </Router>
  );
}

// const App = () => {

// }

// // class App extends React.Component {
// //   constructor(props) {
// //     super(props);

// //     this.state = {
// //       searchResults: [],
// //       playlistName: "New Playlist",
// //       playlistTracks: [],
// //     };

// //     this.search = this.search.bind(this);
// //     this.addTrack = this.addTrack.bind(this);
// //     this.removeTrack = this.removeTrack.bind(this);
// //     this.updatePlaylistName = this.updatePlaylistName.bind(this);
// //     this.savePlaylist = this.savePlaylist.bind(this);
// //   }

// //   search(term) {
// //     search(term).then((searchResults) => {
// //       this.setState({ searchResults: searchResults });
// //     });
// //   }

// //   addTrack(track) {
// //     let tracks = this.state.playlistTracks;
// //     if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
// //       return;
// //     }

// //     tracks.push(track);
// //     this.setState({ playlistTracks: tracks });
// //   }

// //   removeTrack(track) {
// //     let tracks = this.state.playlistTracks;
// //     tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);

// //     this.setState({ playlistTracks: tracks });
// //   }

// //   updatePlaylistName(name) {
// //     this.setState({ playlistName: name });
// //   }

// //   savePlaylist() {
// //     const trackUris = this.state.playlistTracks.map((track) => track.uri);
// //     savePlaylist(this.state.playlistName, trackUris).then(() => {
// //       this.setState({
// //         playlistName: "New Playlist",
// //         playlistTracks: [],
// //       });
// //     });
// //   }

// //   render() {
// //     return (
// //       <div>
// //         <h1>
// //           Ja<span className="highlight">mmm</span>ing
// //         </h1>
// //         <div className="App">
// //           <SearchBar onSearch={this.search} />
// //           <div className="App-playlist">
// //             <SearchResults
// //               searchResults={this.state.searchResults}
// //               onAdd={this.addTrack}
// //             />
// //             <Playlist
// //               playlistName={this.state.playlistName}
// //               playlistTracks={this.state.playlistTracks}
// //               onNameChange={this.updatePlaylistName}
// //               onRemove={this.removeTrack}
// //               onSave={this.savePlaylist}
// //             />
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }
// // }

// export default App;
