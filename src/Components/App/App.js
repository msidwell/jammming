import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../SearchBar/SearchBar.css';
import SearchBar from '../SearchBar/SearchBar';
import '../SearchResults/SearchResults.css';
import SearchResults from '../SearchResults/SearchResults';
import '../Playlist/Playlist.css';
import Playlist from '../Playlist/Playlist'

class App extends Component {
  constructor(props) {
    super(props);
    this.state.SearchResults = [
      {name: "testName", artist: "testArtist", album: "testAlbum"}
    ];
    this.searchResults = this.searchResults.bind(this)
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar searchResults={this.state.searchResults}/>
          <div className="App-playlist">
            <!-- Add a SearchResults component -->
            <!-- Add a Playlist component -->
          </div>
        </div>
      </div>
    );
  }
}

export default App;
