import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { context } from "../../store/context";
// import { useAppSelector } from "../../hooks/redux";
import Track from "../Track/Track";
// import { selectPlaylist } from "./playlistSlice";
import "./Playlist.css";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default function Playlist() {
  const [imageIndex, setImageIndex] = useState(0);
  const { playlist, getAlbum } = useContext(context);
  const history = useHistory();
  // const playlist = useAppSelector(selectPlaylist);

  const handlePrevButton = () => {
    if (imageIndex > 0 && imageIndex <= playlist.images.length) {
      setImageIndex((prevState) => {
        return { imageIndex: --prevState.imageIndex };
      });
    } else {
      setImageIndex({
        imageIndex: playlist.images.length - 1,
      });
    }
  };
  const handleNextButton = () => {
    if (imageIndex >= 0 && imageIndex < playlist.images.length - 1) {
      setImageIndex((prevState) => {
        return { imageIndex: ++prevState.imageIndex };
      });
    } else {
      setImageIndex({
        imageIndex: 0,
      });
    }
  };

  const handleGetAlbum = async (id) => {
    await getAlbum(id);
    history.push(`/album/${id}`)
  }
  console.log("222", playlist);
  return (
    <div>
      {/* <div>{playlist.name}</div> */}
      {playlist.images && (
        <div
          className="playlist-inner-container"
          style={{ outline: "2px solid red" }}
        >
          {/* <div>{playlist.owner.display_name}</div> */}
          {/* <div> */}
          {playlist.images.length !== 0 && (
            <div
              style={{
                backgroundImage: `url(${playlist.images[imageIndex].url})`,
              }}
              className="playlist-image"
              alt="playlist picture"
            >
              {playlist.images.length > 1 && (
                <div
                  style={{ fontSize: "18px", outline: "2px solid red" }}
                  onClick={handlePrevButton}
                >
                  {"<"}
                </div>
              )}

              {playlist.images.length > 1 && (
                <div
                  style={{ fontSize: "18px", outline: "2px solid red" }}
                  onClick={handleNextButton}
                >
                  {">"}
                </div>
              )}
            </div>
          )}

          <div className="playlist-tracks-container">
            <h3>tracks</h3>
            {playlist.tracks.items.length !== 0 && (
              <div className="playlist-tracks">
                {playlist.tracks.items.map((item, index) => {
                  return (
                    <Track
                      key={index}
                      date={item.added_at}
                      albumId={item.track.album.id}
                      getAlbum={handleGetAlbum}
                      artist={item.track.artists[0].name}
                      track={item.track.name}
                      album={item.track.album.name}
                      releaseDate={item.track.album.release_date}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
      <AudioPlayer />
    </div>
  );
}
