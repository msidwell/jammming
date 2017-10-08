import './Playlist.css';
import '../TrackList/TrackList.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends Component {
  render() {
    return (
      <div className="Playlist">
        <input value="New Playlist"/>
        <!-- Add a TrackList component -->
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
  }
}

export default Playlist;
