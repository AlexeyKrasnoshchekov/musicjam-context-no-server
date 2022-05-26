// // import { useState } from "react";
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { RootState } from "../../store/store";
// // import WeatherIcons from "../../assets/weatherIcons/weatherIcons";
// // import { PlaylistState, Playlist } from "../../types/types";
// import SpotifyWebApi from "spotify-web-api-js";
// import { getAccessToken } from "../../util/Spotify";

// // interface Id {
// //   playlistId: string
// // }

// const initialState = {
//   token: '',
//   api: {}
// };

// // export const loadSearch = createAsyncThunk(
// //   "search/loadSearch",
// //   async (searchTerm, thunkAPI) => {
// //     // const { searchTerm } = args;
// //     const types = ["artist", "album", "track"];
// //     const spotifyApi = new SpotifyWebApi();
// //     try {
// //       let data = await spotifyApi.search(searchTerm, types, {limit: 5, market: "RU"});
// //             // let data2 = await data.json();
// //       return data;
// //       // await spotifyApi.getPlaylist(playlistId).then(
// //       //   function (data) {
// //       //     console.log("User playlist111", data);
// //       //   },
// //       //   function (err) {
// //       //     console.error(err);
// //       //   }
// //       // );
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue("Не удалось загрузить картинки");
// //     }
// //   }
// // );

// export const authSlice = createSlice({
//   name: "auth",
//   initialState: initialState,
//   reducers: {
//     getToken: (state) => {
//         console.log('first')
//         // const lala = new SpotifyWebApi();
//         // state.api = lala;
//         // const token = getAccessToken();
//         // state.token = token;
        
//     },
//     auth: (state) => {
//         state.api.setAccessToken(state.token);
//     },
//     logout: (state) => {
//         state.api.setAccessToken("");
//     }
//   }
// //   extraReducers: {
// //     [loadSearch.pending.type]: (state) => {
// //       state.isLoadingSearch = true;
// //       state.failedToLoadSearch = false;
// //     },
// //     [loadSearch.fulfilled.type]: (state, action) => {
// //       console.log("first111", action.payload);
// //     //   state.playlist = action.payload;
// //     },
// //     [loadSearch.rejected.type]: (state) => {
// //       state.isLoadingSearch = false;
// //       state.failedToLoadSearch = true;
// //     },
// //   },
// });

// export const selectApi = (state) => {
//   console.log("777", state.auth.api);
//   return state.auth.api;
// };
// export const selectToken = (state) => {
//   console.log("token", state.auth.token);
//   return state.auth.token;
// };

// // export const isLoadingPlaylist = (state: RootState): boolean =>
// //   state.playlist.isLoadingPlaylist;

// export default authSlice.reducer;
// export const { getToken, auth, logout } = authSlice.actions;
