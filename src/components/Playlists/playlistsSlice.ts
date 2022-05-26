// import { useState } from "react";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
// import WeatherIcons from "../../assets/weatherIcons/weatherIcons";
import { PlaylistsState } from '../../types/types';
import SpotifyWebApi from "spotify-web-api-js";



// interface Coords {
//     lat: number,
//     long: number
// }

const initialState: PlaylistsState = {
    playlists: [],
    owner: '',
    isLoadingPlaylists: false,
    failedToLoadPlaylists: false
};

export const loadPlaylists = createAsyncThunk(
    'playlists/loadPlaylists',
    async (_, thunkAPI) => {
        const spotifyApi = new SpotifyWebApi();
        try {
            let data = await spotifyApi.getUserPlaylists();
            // let data2 = await data.json();
            return data.items; // note that we don't pass a user id
                // .then(
                //     function (data:any) {
                //         console.log("User playlists", data);
                //         return data;
                //     },
                //     function (err:any) {
                //         console.error(err);
                //     }
                // );
        } catch (error) {
            return thunkAPI.rejectWithValue("Не удалось загрузить картинки")
        }

    }
)

export const playlistsSlice = createSlice({
    name: 'playlists',
    initialState: initialState,
    reducers: {
    },
    extraReducers: {
        [loadPlaylists.pending.type]: (state) => {
            state.isLoadingPlaylists = true;
            state.failedToLoadPlaylists = false;
        },
        [loadPlaylists.fulfilled.type]: (state, action) => {
            console.log('first', action.payload)
            let playlistsWithSongs = action.payload.filter((playlist:any) => playlist.tracks.total !==0)
            state.playlists = playlistsWithSongs;
            state.owner = playlistsWithSongs[0].owner.display_name;

        },
        [loadPlaylists.rejected.type]: (state) => {
            state.isLoadingPlaylists = false;
            state.failedToLoadPlaylists = true;
        }
    }
});

export const selectPlaylists = (state: RootState) => {
    console.log('111', state.playlists.playlists)
    return state.playlists.playlists
};

export const isLoadingPlaylists = (state: RootState): boolean => state.playlists.isLoadingPlaylists;
export const selectOwner = (state: RootState): string => state.playlists.owner;

export default playlistsSlice.reducer;
