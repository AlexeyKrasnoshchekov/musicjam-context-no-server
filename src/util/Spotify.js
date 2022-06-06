const clientId = "8ff9d45baf5b4833895018315692b108"; // Insert client ID here.
const redirectUri = "http://localhost:3000/callback"; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.

export const getAccessToken = () => {
  const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
  const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
  if (accessTokenMatch && expiresInMatch) {
    let accessToken = accessTokenMatch[1];
    const expiresIn = Number(expiresInMatch[1]);
    window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
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

export const search = async (term) => {
  const accessToken = getAccessToken();
  return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }));
    });
};

export const savePlaylist = (name, trackUris) => {
  if (!name || !trackUris.length) {
    return;
  }

  const accessToken = getAccessToken();
  const headers = { Authorization: `Bearer ${accessToken}` };
  let userId;

  return fetch("https://api.spotify.com/v1/me", { headers: headers })
    .then((response) => response.json())
    .then((jsonResponse) => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: "POST",
        body: JSON.stringify({ name: name }),
      })
        .then((response) => response.json())
        .then((jsonResponse) => {
          const playlistId = jsonResponse.id;
          return fetch(
            `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
            {
              headers: headers,
              method: "POST",
              body: JSON.stringify({ uris: trackUris }),
            }
          );
        });
    });
};
