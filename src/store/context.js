import { useReducer } from "react";
import { createContext } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { getAccessToken, setUrl } from "../util/Spotify";
import reducer from "./reducer";
import {
  SET_TOKEN,
  SET_TOKEN_IS_SET,
  SET_URL_IS_SET,
  SET_PLAYLISTS,
  SET_PLAYLIST,
  SET_USER,
  SET_SEARCH_RESULT
} from "./reducer";

export const context = createContext();

const State = (props) => {
  const initialState = {
    token: "",
    tokenIsSet: false,
    urlIsSet: false,
    playlists: [],
    playlist: null,
    searchResult: null,
    user: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const spotifyApi = new SpotifyWebApi();

  const setToken = (token) => {
    console.log('token777', token);
    dispatch({ type: SET_TOKEN, payload: token });
  };
  const setTokenIsSet = (bool) =>
    dispatch({ type: SET_TOKEN_IS_SET, payload: bool });

  // const getToken = async () => {
  //   const token = await getAccessToken();
  //   console.log("token", token);
  //   // await spotifyApi.setAccessToken(token);
  //   // token !== "" && setTokenIsSet(true);
  //   // setToken(token);
  //   // console.log("token2", state.token);
  // };
  const auth = () => {
    console.log('auth', state.token);
    spotifyApi.setAccessToken(state.token);
  };

  const logout = () => {
    console.log("222333");
    spotifyApi.setAccessToken("");
    //setAccessToken("");
    setTokenIsSet(false);
  };

  const getPlaylists = async () => {
    console.log('getPlaylists')

    try {
      let data = await spotifyApi.getUserPlaylists();
      console.log("data333", data);
      // let data2 = await data.json();
      // return data.items; // note that we don't pass a user id

      if (data) {
        if (data.items.length !== 0) {
          dispatch({
            type: SET_USER,
            payload: data.items[0].owner.display_name,
          });

          let playlistsWithSongs = data.items.filter(
            (playlist) => playlist.tracks.total !== 0
          );

          if (playlistsWithSongs.length !== 0) {
            playlistsWithSongs.forEach((item) => {
              dispatch({
                type: SET_PLAYLISTS,
                payload: item,
              });
            });
          }
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const getPlaylist = async (playlistId) => {
    try {
      let data = await spotifyApi.getPlaylist(playlistId);
      // console.log("data555", data);
      dispatch({
        type: SET_PLAYLIST,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const search = async (searchTerm) => {
    const types = ["artist", "album", "track"];
    // spotifyApi.setAccessToken(state.token);
    try {
      let data = await spotifyApi.search(searchTerm, types, {limit: 5});
      console.log("data555", data);
      dispatch({
        type: SET_SEARCH_RESULT,
        payload: data,
      });
      console.log("searchresl", state.searchResult);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <context.Provider
      value={{
        token: state.token,
        tokenIsSet: state.tokenIsSet,
        playlists: state.playlists,
        playlist: state.playlist,
        user: state.user,
        searchResult: state.searchResult,
        setToken,        
        auth,
        logout,
        getPlaylists,
        getPlaylist,
        setTokenIsSet,
        search
      }}
    >
      {props.children}
    </context.Provider>
  );
};

export default State;
