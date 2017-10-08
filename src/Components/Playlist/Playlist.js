import React from 'react';
import './Playlist.css';
import '../TrackList/TrackList.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this)
  }
  handleNameChange() {
    this.props.onNameChange(document.getElementById("playlistNameField").value)
  }
  render() {
    return (
      <div className="Playlist">
        <input id="playlistNameField" value={this.props.playlistName} onChange={this.handleNameChange}/>
        <TrackList
          tracks={this.props.playlistTracks}
          onAdd={this.props.onAdd}
          onRemove={this.props.onRemove}
        />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    )
  }
}

export default Playlist;
