import { useReducer } from "react";
import { createContext } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import reducer from "./reducer";
import {
  SET_TOKEN,
  // SET_TOKEN_EXPIRES_IN,
  SET_TOKEN_IS_SET,
  SET_PLAYLISTS,
  SET_PLAYLIST,
  SET_ALBUM,
  SET_MY_ALBUMS,
  SET_MY_TRACKS,
  SET_USER,
  SET_SEARCH_RESULT,
  DELETE_PLAYLIST_ITEM,
  SET_PLAYLIST_ITEMS,
  DELETE_MY_TRACKS_ITEM,
  CLEAR_SAVED_TRACKS,
  CLEAR_SAVED_ALBUMS,
  CLEAR_PLAYLISTS,
  CLEAR_PLAYLIST_ITEMS,
  SET_CATEGORIES
} from "./reducer";

export const context = createContext();

const State = (props) => {
  const initialState = {
    token: "",
    // expiresIn: 0,
    tokenIsSet: false,
    urlIsSet: false,
    playlists: [],
    mySavedAlbums: [],
    mySavedTracks: [],
    playlistItems: [],
    categories: [],
    playlist: null,
    album: null,
    albumId: "",
    searchResult: null,
    user: "",
    total: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const spotifyApi = new SpotifyWebApi();

  const setToken = (token) => {
    console.log("token777", token);
    dispatch({ type: SET_TOKEN, payload: token });
  };
  // const setTokenExpiresIn = (expiresIn) => {
  //   console.log("expiresIn777", typeof expiresIn);
  //   dispatch({ type: SET_TOKEN_EXPIRES_IN, payload: expiresIn });
  // };
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
    console.log("auth", state.token);
    spotifyApi.setAccessToken(state.token);
  };

  const logout = () => {
    console.log("222333");
    // spotifyApi.setAccessToken("");
    //setAccessToken("");
    setTokenIsSet(false);
  };

  const getPlaylists = async () => {
    console.log("getPlaylists");

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
      if (data.tracks.items.length !== 0) {
        data.tracks.items.forEach((item) => {
          dispatch({
            type: SET_PLAYLIST_ITEMS,
            payload: item,
          });
        });
      }

    } catch (error) {
      console.log(error);
    }
  };
  const getAlbum = async (albumId) => {
    console.log("first");
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
 

  const addToPlaylist = async (playlistId, uri) => {
    let playlistTracks = await spotifyApi.getPlaylistTracks(playlistId);
    
    // console.log('playlistTracks1122',playlistTracks);

    if (playlistTracks.items.filter(item => item.track.uri === uri).length === 0) {
      try {
        await spotifyApi.addTracksToPlaylist(playlistId, [uri]);
        return true;
      } catch (error) {
        console.log(error);
      }
    } else {
      return false;
    }
    
  };
  const removeFromPlaylist = async (playlistId, uri, trackId) => {
    console.log("removeTracksFromPlaylist1", playlistId);
    console.log("removeTracksFromPlaylist2", uri);
    try {
      await spotifyApi.removeTracksFromPlaylist(playlistId, [uri]);
      console.log("removeTracksFromPlaylist", playlistId);
      await dispatch({
        type: DELETE_PLAYLIST_ITEM,
        payload: trackId,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const addToMySavedAlbums = async (albumId) => {
    console.log("albumId", albumId);
    console.log("albumId2", typeof albumId);
    try {
      await spotifyApi.addToMySavedAlbums([albumId]);
    } catch (error) {
      console.log(error);
    }
  };
  const getMySavedAlbums = async () => {
    console.log("getMySavedAlbums");
    try {
      let data = await spotifyApi.getMySavedAlbums();
      console.log("datagetMySavedAlbums", data);
      if (data) {
        if (data.items.length !== 0) {
          data.items.forEach((item) => {
            dispatch({
              type: SET_MY_ALBUMS,
              payload: item,
            });
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addToMySavedTracks = async (trackId) => {
    // console.log("albumId", track);
    try {
      await spotifyApi.addToMySavedTracks([trackId]);

    } catch (error) {
      console.log(error);
    }
  };
  const removeFromMySavedTracks = async (savedTrackIndex) => {
    // console.log("removeTracksFromPlaylist1", playlistId);
    
    const savedTrackId = state.mySavedTracks.filter((_, index) => index === savedTrackIndex)[0].track.id;
    console.log("removeTracksFromPlaylist2", savedTrackId);
    try {
      await spotifyApi.removeFromMySavedTracks([savedTrackId]);
      // console.log("removeTracksFromPlaylist", trackId);
      await dispatch({
        type: DELETE_MY_TRACKS_ITEM,
        payload: savedTrackId,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const removeFromMySavedAlbums = async (albumId) => {
    // console.log("removeTracksFromPlaylist1", playlistId);
    
    // const savedTrackId = state.mySavedTracks.filter((_, index) => index === savedTrackIndex)[0].track.id;
    console.log("removeTracksFromPlaylist2", albumId);
    try {
      await spotifyApi.removeFromMySavedAlbums([albumId]);
      // console.log("removeTracksFromPlaylist", trackId);
      // await dispatch({
      //   type: DELETE_MY_TRACKS_ITEM,
      //   payload: savedTrackId,
      // });
    } catch (error) {
      console.log(error);
    }
  };
  const getMySavedTracks = async () => {
    console.log("getMySavedAlbums");
    try {
      let data = await spotifyApi.getMySavedTracks();
      console.log("datagetMySavedTracks", data);
      if (data) {
        if (data.items.length !== 0) {
          data.items.forEach((item) => {
            dispatch({
              type: SET_MY_TRACKS,
              payload: item,
            });
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getMyTopArtists = async () => {
    // console.log("getMyTopArtists");
    try {
      let data = await spotifyApi.getMyTopArtists();
      console.log("getMyTopArtists", data);
      // if (data) {
      //   if (data.items.length !== 0) {
      //     data.items.forEach((item) => {
      //       dispatch({
      //         type: SET_MY_TRACKS,
      //         payload: item,
      //       });
      //     });
      //   }
      // }
    } catch (error) {
      console.log(error);
    }
  };
  const getCategories = async () => {
    // console.log("getMyTopTracks");
    try {
      let data = await spotifyApi.getCategories();
      console.log("getCategories", data);
      if (data) {
        if (data.categories.items.length !== 0) {
          data.categories.items.forEach((item) => {
            dispatch({
              type: SET_CATEGORIES,
              payload: item,
            });
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createPlaylist = async (playlistName) => {
    const data = await spotifyApi.getMe();
    console.log("data2323", data);
    try {
      let newPlaylist = await spotifyApi.createPlaylist(data.id, {
        name: playlistName,
      });
      console.log("data4455", newPlaylist.id);
      await spotifyApi.addTracksToPlaylist(newPlaylist.id, [
        "spotify:track:2bfGNzdiRa1jXZRdfssSzR",
      ]);
      console.log("createPlaylist");
    } catch (error) {
      console.log(error);
    }
  };
  const search = async (searchTerm) => {
    const types = ["artist", "album", "track"];
    // spotifyApi.setAccessToken(state.token);
    try {
      let data = await spotifyApi.search(searchTerm, types, { limit: 5 });
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
  // const searchAlbum = async (albumName) => {
  //   console.log("albumName", albumName);
  //   const types = ["album"];
  //   try {
  //     let data = await spotifyApi.search(albumName, types, { limit: 5 });
  //     dispatch({
  //       type: SET_SEARCH_RESULT,
  //       payload: data,
  //     });
  //     // console.log("data999", state.album);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const clearSavedTracks = () => dispatch({ type: CLEAR_SAVED_TRACKS });
  const clearSavedAlbums = () => dispatch({ type: CLEAR_SAVED_ALBUMS });
  const clearPlaylists = () => dispatch({ type: CLEAR_PLAYLISTS });
  const clearPlaylistItems = () => dispatch({ type: CLEAR_PLAYLIST_ITEMS });

  return (
    <context.Provider
      value={{
        token: state.token,
        // expiresIn: state.expiresIn,
        tokenIsSet: state.tokenIsSet,
        playlists: state.playlists,
        playlist: state.playlist,
        album: state.album,
        user: state.user,
        searchResult: state.searchResult,
        mySavedAlbums: state.mySavedAlbums,
        mySavedTracks: state.mySavedTracks,
        playlistItems: state.playlistItems,
        categories: state.categories,
        setToken,
        auth,
        logout,
        getPlaylists,
        getAlbum,
        getPlaylist,
        setTokenIsSet,
        search,
        // saveAlbum,
        addToPlaylist,
        removeFromPlaylist,
        createPlaylist,
        addToMySavedAlbums,
        getMySavedAlbums,
        addToMySavedTracks,
        removeFromMySavedTracks,
        getMySavedTracks,
        clearSavedTracks,
        clearSavedAlbums,
        removeFromMySavedAlbums,
        clearPlaylists,
        clearPlaylistItems,
        getMyTopArtists,
        getCategories,

      }}
    >
      {props.children}
    </context.Provider>
  );
};

export default State;
