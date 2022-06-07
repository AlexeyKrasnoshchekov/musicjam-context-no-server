import { Select, Dropdown, Menu, Space } from "antd";
import { Option } from "antd/lib/mentions";
import { useContext } from "react";
import { context } from "../../context/context";
import "./Track.css";

function Track({
  date,
  artist,
  track,
  trackId,
  album,
  uri,
  releaseDate,
  duration,
  trackNumber,
  albumId,
  getAlbum,
}) {
  

  let duration_min = Math.floor(duration / 60);
  let duration_sec = Math.round(duration % 60);

  const {
    playlists,
    addToPlaylist,
    addToMySavedTracks,
    clearSavedTracks,
    getMySavedTracks,
  } = useContext(context);

  const menu = (
    <Menu>
      {playlists.map((playlist, index) => {
        return <Menu.Item key={index} onClick={() => {handleAddToPlaylist(playlist.id)}}>{playlist.name}</Menu.Item>;
      })}
    </Menu>
  );

  const handleAddToPlaylist = (playlistId) => {
    addToPlaylist(playlistId, uri);
  };

  const handleAddTrack = async (trackId) => {
    await addToMySavedTracks(trackId);
    await clearSavedTracks();
    await getMySavedTracks();
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
        {album && (
          <div onClick={() => getAlbum(albumId)}>{`Album: ${album}`}</div>
        )}
        {releaseDate && <div>{`Realesed: ${releaseDate}`}</div>}
        {duration && <div>{`Duration: ${duration_min}:${duration_sec}`}</div>}
      </div>
      {/* <Select onChange={handleChange}>
        {playlists.map(playlist => {
          return <Option key={playlist.id} value={playlist.id}>{playlist.name}</Option>
        })}
      </Select> */}
      <Dropdown overlay={menu} >
        {/* <a onClick={(e) => e.preventDefault()}> */}
          <Space>
            Add to Playlist
            {/* <DownOutlined /> */}
          </Space>
        {/* </a> */}
      </Dropdown>
      <div
        onClick={() => {
          handleAddTrack(trackId);
        }}
      >
        ADD TO SAVED
      </div>
    </div>
  );
}

export default Track;
