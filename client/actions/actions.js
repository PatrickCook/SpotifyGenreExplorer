import Spotify from 'spotify-web-api-js';
const spotifyApi = new Spotify();
const baseURL = "http://localhost:3000/";
// our constants
export const SPOTIFY_TOKENS = 'SPOTIFY_TOKENS';
export const SPOTIFY_ME_BEGIN = 'SPOTIFY_ME_BEGIN';
export const SPOTIFY_ME_SUCCESS = 'SPOTIFY_ME_SUCCESS';
export const SPOTIFY_ME_FAILURE = 'SPOTIFY_ME_FAILURE';
export const SPOTIFY_TOP_BEGIN = 'SPOTIFY_TOP_BEGIN';
export const SPOTIFY_TOP_SUCCESS = 'SPOTIFY_TOP_SUCCESS';
export const SPOTIFY_TOP_FAILURE = 'SPOTIFY_TOP_FAILURE';
export const SPOTIFY_ERROR_MSG = 'SPOTIFY_ERROR_MSG';
export const SPOTIFY_GENRE_SUCCESS = 'SPOTIFY_GENRE_SUCCESS';

/** set the app's access and refresh tokens */
export function setTokens({accessToken, refreshToken}) {
  if (accessToken) {
    spotifyApi.setAccessToken(accessToken);
  }
  return { type: SPOTIFY_TOKENS, accessToken, refreshToken };
}

export function setErrorMsg ( message ) {
   return dispatch => {
      dispatch ({ type: SPOTIFY_ERROR_MSG, errorMsg: message });
   }
}
/* get the user's info from the me api */

export function getMyInfo() {
  return dispatch => {
    dispatch({ type: SPOTIFY_ME_BEGIN});
    spotifyApi.getMe().then(data => {
      dispatch({ type: SPOTIFY_ME_SUCCESS, data: data });
    }).catch(e => {
      dispatch({ type: SPOTIFY_ME_FAILURE, error: e });
    });
  };
}

export function getArtistInfo(options) {
   return dispatch => {
     dispatch({ type: SPOTIFY_ME_BEGIN});
     spotifyApi.searchArtists(options.artistSearchText).then(data => {
        console.log('Search artists by "Love"', data);
        dispatch({ type: SPOTIFY_GENRE_SUCCESS, artists: data.artists });
     }).catch(e => {
      dispatch({ type: SPOTIFY_ME_FAILURE, error: e });
     });
   };
}

/*
 * id: this.props.user.id,
 * name: this.refs.playlistName.value,
 * range: "medium_term",
 * size: this.refs.playlistSize.value
*/

export function getTopTracks(options) {
   const { id, name, size, range } = options
   var topTracks = []
   var playlist = {}

   return dispatch => {
      dispatch({type: SPOTIFY_TOP_BEGIN});
      fetch(baseURL+"topsongs/"+range+"/"+size, {method: 'GET'})
      .then((data) => { return data.json() })
      .then((tracks) => {
         topTracks = tracks.items
         dispatch({type: SPOTIFY_TOP_SUCCESS, data: tracks.items})
      })
      .then(() => {
         return spotifyApi.createPlaylist(id, {
           "name": name,
           "description": "New playlist description",
           "public": false
         })
      })
      .then((data) => {
         topTracks = topTracks.map((track) => "spotify:track:".concat(track.id))
         console.log(topTracks)
         return spotifyApi.addTracksToPlaylist(id, data.id, topTracks)
      })
      .catch((err) => {
         dispatch({ type: SPOTIFY_TOP_FAILURE, error: err });
         console.error(err);
      });
   }
}
