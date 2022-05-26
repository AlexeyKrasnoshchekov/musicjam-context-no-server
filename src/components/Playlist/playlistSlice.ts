// import { useState } from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
// import WeatherIcons from "../../assets/weatherIcons/weatherIcons";
import { PlaylistState, Playlist } from "../../types/types";
import SpotifyWebApi from "spotify-web-api-js";

// interface Id {
//   playlistId: string
// }

const initialState: PlaylistState = {
  playlist: {
    images: [],
    name: '',
    tracks: {
      href: '',
      total: 0
    },
    id: ''
  },
  isLoadingPlaylist: false,
  failedToLoadPlaylist: false,
};

export const loadPlaylist = createAsyncThunk(
  "playlist/loadPlaylist",
  async (playlistId: string, thunkAPI) => {
    // const { playlistId } = args;
    const spotifyApi = new SpotifyWebApi();
    try {
      let data = await spotifyApi.getPlaylist(playlistId);
            // let data2 = await data.json();
      return data;
      // await spotifyApi.getPlaylist(playlistId).then(
      //   function (data) {
      //     console.log("User playlist111", data);
      //   },
      //   function (err) {
      //     console.error(err);
      //   }
      // );
    } catch (error) {
      return thunkAPI.rejectWithValue("Не удалось загрузить картинки");
    }
  }
);

export const playlistSlice = createSlice({
  name: "playlist",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [loadPlaylist.pending.type]: (state) => {
      state.isLoadingPlaylist = true;
      state.failedToLoadPlaylist = false;
    },
    [loadPlaylist.fulfilled.type]: (state, action) => {
      console.log("first111", action.payload);
      state.playlist = action.payload;
    },
    [loadPlaylist.rejected.type]: (state) => {
      state.isLoadingPlaylist = false;
      state.failedToLoadPlaylist = true;
    },
  },
});

export const selectPlaylist = (state: RootState) => {
  console.log("111", state.playlist.playlist);
  return state.playlist.playlist;
};

export const isLoadingPlaylist = (state: RootState): boolean =>
  state.playlist.isLoadingPlaylist;

export default playlistSlice.reducer;
