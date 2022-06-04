import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import { useContext } from "react";
import { context } from "../../context/context";
import "./Track.css";

function Track({ date, artist, track, album,uri, releaseDate, duration, trackNumber, albumId, getAlbum }) {

  let duration_min = Math.floor(duration / 60);
  let duration_sec = Math.round(duration % 60);

  const { playlists, addToPlaylist } = useContext(context);

  const handleChange = (value) => {
    addToPlaylist(value, uri);
  };

  // console.log('trackNumber', trackNumber)

  return (
    <div className="track-container">
      <div className="track-song">
        {artist && track && <div>{`${artist} - ${track}`}</div>}
        {!artist && track && <div>{`${trackNumber}. ${track}`}</div>}
        {/* <div>{track}</div> */}
      </div>
      <div className="track-info">
        {album && <div onClick={() => getAlbum(albumId)}>{`Album: ${album}`}</div>}
        {releaseDate && <div>{`Realesed: ${releaseDate}`}</div>}
        {duration && <div>{`Duration: ${duration_min}:${duration_sec}`}</div>}
      </div>
      <Select onChange={handleChange}>
        {playlists.map(playlist => {
          return <Option key={playlist.id} value={playlist.id}>{playlist.name}</Option>
        })}
      </Select>
    </div>
  );
}

export default Track;
