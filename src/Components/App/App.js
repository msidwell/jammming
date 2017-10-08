import React, { Component } from 'react';
import './App.css';
import '../SearchBar/SearchBar.css';
import SearchBar from '../SearchBar/SearchBar';
import '../SearchResults/SearchResults.css';
import SearchResults from '../SearchResults/SearchResults';
import '../Playlist/Playlist.css';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "myPlaylist",
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this)
  }
  addTrack(track) {
    if(!(this.state.playlistTracks.includes(track))) {
      let newPlaylist = this.state.playlistTracks;
      newPlaylist.push(track);
      this.setState({playlistTracks: newPlaylist})
    }
  }
  removeTrack(track) {
    let newPlaylist = this.state.playlistTracks;
    let removalIndex = newPlaylist.indexOf(track);
    newPlaylist.splice(removalIndex, 1);
    this.setState({playlistTracks: newPlaylist})
  }
  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }
  savePlaylist() {
    let trackURIs = [];
    this.state.playlistTracks.map(track => {
          trackURIs.push(track.uri)
        });
    Spotify.savePlaylist(this.state.playlistName, trackURIs)
  }
  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar searchResults={this.state.searchResults} onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onAdd={this.addTrack}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
