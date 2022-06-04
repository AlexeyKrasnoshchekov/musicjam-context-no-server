/* eslint-disable default-case */
export const SET_TOKEN = "SET_TOKEN";
export const SET_TOKEN_IS_SET = "SET_TOKEN_IS_SET";
export const SET_URL_IS_SET = "SET_URL_IS_SET";
export const SET_PLAYLISTS = "SET_PLAYLISTS";
export const SET_PLAYLIST = "SET_PLAYLIST";
export const SET_ALBUM = "SET_ALBUM";
export const SET_USER = "SET_USER";
export const CHANGE_TOTAL = "CHANGE_TOTAL";
export const SET_SEARCH_RESULT = "SET_SEARCH_RESULT";
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
      case SET_PLAYLISTS:
        return {
          ...state,
          playlists: [...state.playlists, action.payload],
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
  