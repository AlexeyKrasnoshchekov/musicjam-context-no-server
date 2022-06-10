const clientId = "8ff9d45baf5b4833895018315692b108"; // Insert client ID here.
const redirectUri = "http://localhost:3000/callback"; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.

export const getAccessToken = () => {
  console.log('window.location.href', window.location.href);
  const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
  // const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
  // if (accessTokenMatch && expiresInMatch) {
  if (accessTokenMatch) {
    const accessToken = accessTokenMatch[1];
    // const expiresIn = Number(expiresInMatch[1]);
    window.history.pushState("Access Token", null, "/"); // This clears the parameters, allowing us to grab a new access token when it expires.
    // let obj = {accessToken: accessToken, expiresIn: expiresIn};
    return accessToken;
  }
};

const scopes = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'app-remote-control',
  'user-read-email',
  'user-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify-private',
  'user-library-modify',
  'user-library-read',
  'user-top-read',
  'user-read-playback-position',
  'user-read-recently-played',
  'user-follow-read',
  'user-follow-modify'
];

export const setUrl = () => {
  const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&scope=${scopes}&response_type=token&redirect_uri=${redirectUri}`;
  window.location = accessUrl;
};


