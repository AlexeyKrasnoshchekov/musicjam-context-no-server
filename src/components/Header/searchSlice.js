// import { useState } from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
// import WeatherIcons from "../../assets/weatherIcons/weatherIcons";
// import { PlaylistState, Playlist } from "../../types/types";
import SpotifyWebApi from "spotify-web-api-js";

// interface Id {
//   playlistId: string
// }

const initialState = {
  artists: [],
  albums: [],
  tracks: [],
  isLoadingSearch: false,
  failedToLoadSearch: false,
};

export const loadSearch = createAsyncThunk(
  "search/loadSearch",
  async (searchTerm, thunkAPI) => {
    // const { searchTerm } = args;
    const types = ["artist", "album", "track"];
    const spotifyApi = new SpotifyWebApi();
    try {
      let data = await spotifyApi.search(searchTerm, types, {limit: 5, market: "RU"});
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

export const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [loadSearch.pending.type]: (state) => {
      state.isLoadingSearch = true;
      state.failedToLoadSearch = false;
    },
    [loadSearch.fulfilled.type]: (state, action) => {
      console.log("first111", action.payload);
    //   state.playlist = action.payload;
    },
    [loadSearch.rejected.type]: (state) => {
      state.isLoadingSearch = false;
      state.failedToLoadSearch = true;
    },
  },
});

export const selectSearch = (state) => {
  console.log("777", state.search);
  return state.search;
};

// export const isLoadingPlaylist = (state: RootState): boolean =>
//   state.playlist.isLoadingPlaylist;

export default searchSlice.reducer;
