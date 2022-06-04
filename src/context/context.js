import { useReducer } from "react";
import { createContext } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import reducer from "./reducer";
import {
  SET_TOKEN,
  SET_TOKEN_IS_SET,
  SET_URL_IS_SET,
  SET_PLAYLISTS,
  SET_PLAYLIST,
  SET_ALBUM,
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
    album: null,
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
    // spotifyApi.setAccessToken("");
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
  const getSavedAlbums = async () => {
    console.log('getPlaylists')

    try {
      let data = await spotifyApi.getUser();
      console.log("data333", data);
      // let data2 = await data.json();
      // return data.items; // note that we don't pass a user id

      // if (data) {
      //   if (data.items.length !== 0) {
      //     dispatch({
      //       type: SET_USER,
      //       payload: data.items[0].owner.display_name,
      //     });

      //     let playlistsWithSongs = data.items.filter(
      //       (playlist) => playlist.tracks.total !== 0
      //     );

      //     if (playlistsWithSongs.length !== 0) {
      //       playlistsWithSongs.forEach((item) => {
      //         dispatch({
      //           type: SET_PLAYLISTS,
      //           payload: item,
      //         });
      //       });
      //     }
      //   }
      // }
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
  const getAlbum = async (albumId) => {
    console.log('first')
    try {
      let data = await spotifyApi.getAlbum(albumId);
      console.log("data888", data);
      await dispatch({
        type: SET_ALBUM,
        payload: data,
      });
      console.log("data999", state.album);
    } catch (error) {
      console.log(error);
    }
  };
  const saveAlbum = async (albumId) => {
    console.log('first', albumId)
    spotifyApi.setAccessToken(state.token);
    try {
      await spotifyApi.addToMySavedAlbums(albumId);
      console.log("addToMySavedAlbums");
      // await dispatch({
      //   type: SET_ALBUM,
      //   payload: data,
      // });
      // console.log("data999", state.album);
    } catch (error) {
      console.log(error);
    }
  };
  const addToPlaylist = async (playlistId, uri) => {
    try {
      await spotifyApi.addTracksToPlaylist(playlistId, [uri]);
      console.log("addTracksToPlaylist", playlistId);

    } catch (error) {
      console.log(error);
    }
  };
  const createPlaylist = async (playlistName) => {
    const data = await spotifyApi.getMe();
    console.log('data2323', data);
    try {
      let newPlaylist = await spotifyApi.createPlaylist(data.id, {name: playlistName});
      console.log('data4455', newPlaylist.id)
      await spotifyApi.addTracksToPlaylist(newPlaylist.id, ["spotify:track:2bfGNzdiRa1jXZRdfssSzR"]);
      console.log("createPlaylist");

    } catch (error) {
      console.log(error);
    }
  };
  const search = async (searchTerm) => {
    const types = ["artist", "album", "track"];
    // spotifyApi.setAccessToken(state.token);
    try {
      let data = await spotifyApi.search(searchTerm, types, {limit: 5});
      console.log("data777", data);
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
        album: state.album,
        user: state.user,
        searchResult: state.searchResult,
        setToken,        
        auth,
        logout,
        getPlaylists,
        getAlbum,
        getPlaylist,
        setTokenIsSet,
        search,
        saveAlbum,
        addToPlaylist,
        createPlaylist
      }}
    >
      {props.children}
    </context.Provider>
  );
};

export default State;
