import React, { useContext, useState } from "react";
import { context } from "../../store/context";
import SavedAlbums from "../SavedAlbums/savedAlbums";
// import { useAppSelector } from "../../hooks/redux";
import Track from "../Track/Track";
// import { selectPlaylist } from "./playlistSlice";
import "./album.css";

export default function Album() {
  const [imageIndex, setImageIndex] = useState(0);
  const { album, saveAlbum } = useContext(context);
  // const playlist = useAppSelector(selectPlaylist);

  const handlePrevButton = () => {
    if (imageIndex > 0 && imageIndex <= album.images.length) {
      setImageIndex((prevState) => {
        return { imageIndex: --prevState.imageIndex };
      });
    } else {
      setImageIndex({
        imageIndex: album.images.length - 1,
      });
    }
  };
  const handleNextButton = () => {
    if (imageIndex >= 0 && imageIndex < album.images.length - 1) {
      setImageIndex((prevState) => {
        return { imageIndex: ++prevState.imageIndex };
      });
    } else {
      setImageIndex({
        imageIndex: 0,
      });
    }
  };

  const handleSaveAlbum = (id) => {
    console.log('id', id)
    saveAlbum(id);
  }
  console.log("222", album);
  return (
    <div>
      {/* <div>{album.name}</div> */}
      {album.images && (
        <div
          className="album-inner-container"
          style={{ outline: "2px solid red" }}
        >
          {/* <div>{album.owner.display_name}</div> */}
          {/* <div> */}
          {album.images.length !== 0 && (
            <div
              style={{
                backgroundImage: `url(${album.images[imageIndex].url})`,
              }}
              className="album-image"
              alt="album picture"
            >
              {album.images.length > 1 && (
                <div
                  style={{ fontSize: "18px", outline: "2px solid red" }}
                  onClick={handlePrevButton}
                >
                  {"<"}
                </div>
              )}

              {album.images.length > 1 && (
                <div
                  style={{ fontSize: "18px", outline: "2px solid red" }}
                  onClick={handleNextButton}
                >
                  {">"}
                </div>
              )}
            </div>
          )}

          <div className="album-tracks-container">
            <div onClick={() => saveAlbum(album.id)}>save</div>
            <h3>{album.tracks.items[0].artists[0].name}</h3>
            <h3>{album.name}</h3>
            {album.tracks.items.length !== 0 && (
              <div className="album-tracks">
                {album.tracks.items.map((item, index) => {
                  return (
                    <Track
                      key={index}
                      // date={item.added_at}
                      // artist={item.artists[0].name}
                      track={item.name}
                      trackNumber={item.track_number}
                      duration={item.duration_ms / 1000}
                      uri={item.uri}
                      // releaseDate={item.track.album.release_date}
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
