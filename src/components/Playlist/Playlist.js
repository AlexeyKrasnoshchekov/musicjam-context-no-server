import React, { useContext, useState } from "react";
import { context } from "../../store/context";
// import { useAppSelector } from "../../hooks/redux";
import Track from "../Track/Track";
// import { selectPlaylist } from "./playlistSlice";

export default function Playlist() {
  const [imageIndex, setImageIndex] = useState(0);
  const {
    playlist,
  } = useContext(context);
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
  console.log("222", playlist);
  return (
    <div>
      {playlist.images && (
        <div style={{ outline: "2px solid red" }}>
          <div>{playlist.name}</div>
          <div>{playlist.owner.display_name}</div>
          {playlist.images.length !== 0 && (
            <div
              style={{
                backgroundImage: `url(${playlist.images[imageIndex].url})`,
              }}
              className="playlistImage"
              alt="product picture"
            >
              <div style={{fontSize:'18px', outline:'2px solid red'}} onClick={handlePrevButton}>{"<"}</div>

              <div style={{fontSize:'18px', outline:'2px solid red'}} onClick={handleNextButton}>{">"}</div>
            </div>
          )}
          <h3>Tracks</h3>
          <div>
            {playlist.tracks.items.length !== 0 && (
              <div>
                {playlist.tracks.items.map((item) => {
                  return (
                    <Track
                      date={item.added_at}
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
    </div>
  );
}
