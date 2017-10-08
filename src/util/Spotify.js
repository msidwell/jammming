const clientId = '6c228b5864fb48ebb4698d91f85eb875';
const redirectURI = "msidwell_Jammming.surge.sh"
let userToken = false;

let Spotify = {
  getAccessToken() {
    if(userToken) {
        return new Promise(resolve => resolve(userToken));
    } else if(window.location.href.match(/access_token=([^&]*)/,/expires_in=([^&]*)/)) {
        userToken = (window.location.href.match(/access_token=([^&]*)/))[1];
        let expiresIn = (window.location.href.match(/expires_in=([^&]*)/))[1];
        window.setTimeout(() => userToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return new Promise(resolve => resolve(userToken))
    } else {
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        userToken = (window.location.href.match(/access_token=([^&]*)/))[1];
        let expiresIn = (window.location.href.match(/expires_in=([^&]*)/))[1];
        window.setTimeout(() => userToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return new Promise(resolve => resolve(userToken))
    }
  },
  search(term) {
    let url = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    return Spotify.getAccessToken().then(() => {
      return fetch(url, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }).then(response => {
          return response.json();
      }).then(jsonResponse => {
        if(jsonResponse.tracks.items.length >= 1) {
          return jsonResponse.tracks.items.map(track => {
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri
            }
          })
        }
        return [{id: 'no_result', name: `No results for ${term}`}]
      });
    });
  },
  savePlaylist: async function (playlistName, uriArray) {
    if(playlistName && uriArray.length >= 1) {
      Spotify.getAccessToken();
      let headers = {Authorization: `Bearer ${userToken}`}
      const userUrl = 'https://api.spotify.com/v1/me';
      let response = await fetch(userUrl, {
          headers: headers
        }
      );
      let userInfo = await response.json();

      const playlistCreateUrl = `https://api.spotify.com/v1/users/${userInfo.id}/playlists`;
      headers = {Authorization: `Bearer ${userToken}`, 'Content-Type': 'application/json'}
      response = await fetch(playlistCreateUrl, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({name: playlistName})
        }
      );
      let playlistInfo = await response.json();

      const playlistTracksUrl = `https://api.spotify.com/v1/users/${userInfo.id}/playlists/${playlistInfo.id}/tracks`;
      let trackInfo = await fetch (playlistTracksUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({uris: uriArray})
        }
      );
    }
    return
  }
};

export default Spotify;
