const clientId = "8ff9d45baf5b4833895018315692b108"; // Insert client ID here.
const redirectUri = "https://alexeykrasnoshchekov.github.io/musicjam/callback"; 
// const redirectUri = "http://localhost:3000/callback"; 

export const getAccessToken = () => {
  const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
  if (accessTokenMatch) {
    const accessToken = accessTokenMatch[1];
    window.history.pushState("Access Token", null, "/"); // This clears the parameters, allowing us to grab a new access token when it expires.

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


