/* eslint-disable default-case */
export const SET_TOKEN = "SET_TOKEN";
export const SET_TOKEN_IS_SET = "SET_TOKEN_IS_SET";
export const SET_URL_IS_SET = "SET_URL_IS_SET";
export const SET_PLAYLISTS = "SET_PLAYLISTS";
export const SET_PLAYLIST = "SET_PLAYLIST";
export const SET_MY_TRACKS = "SET_MY_TRACKS";
export const SET_ALBUM = "SET_ALBUM";
export const SET_MY_ALBUMS = "SET_MY_ALBUMS";
export const SET_USER = "SET_USER";
export const CHANGE_TOTAL = "CHANGE_TOTAL";
export const SET_SEARCH_RESULT = "SET_SEARCH_RESULT";
export const DELETE_PLAYLIST_ITEM = "DELETE_PLAYLIST_ITEM";
export const SET_PLAYLIST_ITEMS = "SET_PLAYLIST_ITEMS";
export const DELETE_MY_TRACKS_ITEM = "DELETE_MY_TRACKS_ITEM";
// export const ADD_MY_TRACKS_ITEM = "ADD_MY_TRACKS_ITEM";
export const CLEAR_SAVED_TRACKS = "CLEAR_SAVED_TRACKS";
export const CLEAR_SAVED_ALBUMS = "CLEAR_SAVED_ALBUMS";
export const CLEAR_PLAYLISTS = "CLEAR_PLAYLISTS";
export const CLEAR_PLAYLIST_ITEMS = "CLEAR_PLAYLIST_ITEMS";
export const SET_CATEGORIES = "SET_CATEGORIES";
// export const SET_TOKEN_EXPIRES_IN = "SET_TOKEN_EXPIRES_IN";


// export const SET_LOCATION = "SET_LOCATION";
// export const SET_SORT_BY = "SET_SORT_BY";
// export const SET_PAGE = "SET_PAGE";
// export const CLEAR_PLACES = "CLEAR_PLACES";
  
  // eslint-disable-next-line import/no-anonymous-default-export
  export default (state, action) => {
    switch (action.type) {
      case SET_TOKEN:
        
        return {
          ...state,
          token: action.payload,
        };
        // case SET_TOKEN_EXPIRES_IN:
        
        // return {
        //   ...state,
        //   expiresIn: action.payload,
        // };
      case SET_PLAYLISTS:
        return {
          ...state,
          playlists: [...state.playlists, action.payload],
          // loading: false,
        };
      case SET_CATEGORIES:
        return {
          ...state,
          categories: [...state.categories, action.payload],
          // loading: false,
        };
      case SET_MY_ALBUMS:
        return {
          ...state,
          mySavedAlbums: [...state.mySavedAlbums, action.payload],
          // loading: false,
        };
      case SET_MY_TRACKS:
        return {
          ...state,
          mySavedTracks: [...state.mySavedTracks, action.payload],
          // loading: false,
        };
  
      case SET_TOKEN_IS_SET:
        
        return {
          ...state,
          tokenIsSet: action.payload,
        };
      case SET_URL_IS_SET:
        
        return {
          ...state,
          urlIsSet: action.payload,
        };
      case SET_PLAYLIST:
        return {
          ...state,
          playlist: action.payload,
        };
      case SET_ALBUM:
        console.log('action.payload222', action.payload);
        return {
          ...state,
          album: action.payload,
        };
      case SET_SEARCH_RESULT:
        
        return {
          ...state,
          searchResult: action.payload,
        };
      case SET_USER:
        return {
          ...state,
          user: action.payload,
        };
        case DELETE_PLAYLIST_ITEM:
        return {
          ...state,
          playlistItems: state.playlistItems.filter(item => item.track.id !== action.payload),
        };
        case SET_PLAYLIST_ITEMS:
        return {
          ...state,
          playlistItems: [...state.playlistItems, action.payload],
        };
        // case ADD_MY_TRACKS_ITEM:
        // return {
        //   ...state,
        //   mySavedTracks: [...state.mySavedTracks, action.payload],
        // };
        case DELETE_MY_TRACKS_ITEM:
        return {
          ...state,
          mySavedTracks: state.mySavedTracks.filter(item => item.track.id !== action.payload),
        };
        case CLEAR_SAVED_TRACKS: {
          return {
            ...state,
            mySavedTracks: [],
          };
        }
        case CLEAR_SAVED_ALBUMS: {
          return {
            ...state,
            mySavedAlbums: [],
          };
        }
        case CLEAR_PLAYLISTS: {
          return {
            ...state,
            playlists: [],
          };
        }
        case CLEAR_PLAYLIST_ITEMS: {
          return {
            ...state,
            playlistItems: [],
          };
        }

      // case SET_TERM:
      //   return {
      //     ...state,
      //     term: action.payload,
      //   };
      // case SET_LOCATION:
      //   return {
      //     ...state,
      //     location: action.payload,
      //   };
      
      // case SET_PAGE:
      //   return {
      //     ...state,
      //     page: action.payload,
      //   };
      //   case CLEAR_PLACES: {
      //       return {
      //         ...state,
      //         places: [],
      //       };
      //     }
  
    }
  };
  