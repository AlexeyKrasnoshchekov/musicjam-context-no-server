import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import playlistsReducer from '../components/Playlists/playlistsSlice';
import playlistReducer from '../components/Playlist/playlistSlice';
import searchReducer from '../components/Header/searchSlice';
// import authReducer from '../components/App/authSlice';
// import quoteReducer from '../components/quote/quoteSlice';
// import imageReducer from '../components/image/imageSlice';
// import goalsReducer from '../components/goals/goalsSlice';

const rootReducer = combineReducers({
  playlists: playlistsReducer,
  playlist: playlistReducer,
  search: searchReducer,
  // auth: authReducer,
  // goals: goalsReducer
})

// export const store = () => {
//   return configureStore({
//     reducer: rootReducer
//   });
// }

export const store = configureStore({
  reducer: rootReducer
});

// export type TStore = ReturnType<typeof store.getState>;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;