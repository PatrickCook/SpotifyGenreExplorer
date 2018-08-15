import {
  SPOTIFY_TOKENS, SPOTIFY_ME_BEGIN, SPOTIFY_ME_SUCCESS, SPOTIFY_ME_FAILURE,
  SPOTIFY_TOP_BEGIN, SPOTIFY_TOP_SUCCESS, SPOTIFY_TOP_FAILURE, SPOTIFY_ERROR_MSG,
  SPOTIFY_GENRE_SUCCESS
} from '../actions/actions';

/** The initial state; no tokens and no user info */
const initialState = {
  accessToken: null,
  refreshToken: null,
  user: {
    loading: false,
    country: null,
    display_name: null,
    email: null,
    external_urls: {},
    followers: {},
    href: null,
    id: null,
    images: [],
    product: null,
    type: null,
    uri: null,
   },
   artists: null,
   errorMsg: null
};

/**
 * Our reducer
 */
export default function reduce(state = initialState, action) {
  switch (action.type) {
  // when we get the tokens... set the tokens!
  case SPOTIFY_TOKENS:
    const {accessToken, refreshToken} = action;
    return Object.assign({}, state, {accessToken, refreshToken});

  // set our loading property when the loading begins
  case SPOTIFY_ME_BEGIN:
    return Object.assign({}, state, {loading: true}, {
      user: Object.assign({}, state.user)
    });

  // when we get the data merge it in
  case SPOTIFY_ME_SUCCESS:
    return Object.assign({}, state, {loading: false}, {
      user: Object.assign({}, state.user, action.data)
    });

  case SPOTIFY_TOP_BEGIN:
    return Object.assign({}, state, {loading: true}, {
      tracks: Object.assign({}, state.tracks)
    });

  // when we get the data merge it in
  case SPOTIFY_TOP_SUCCESS:
    return Object.assign({}, state, {loading: false}, {
      tracks: Object.assign({}, state.tracks, action.data)
    });

  case SPOTIFY_GENRE_SUCCESS:
    console.log("SPOTIFY_GENRE_SUCCESS")
    return Object.assign({}, state, {loading: false}, {
      artists: Object.assign({}, state.artists, action.artists)
    });
  // currently no failure state :(
  case SPOTIFY_ERROR_MSG:
    return Object.assign({}, state, {errorMsg: action.errorMsg});
  default:
    return state;
  }
}
