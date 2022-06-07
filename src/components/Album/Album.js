import { useContext, useState } from "react";
import { context } from "../../context/context";
import Track from "../Track/Track";
import "./album.css";

export default function Album() {
  const [imageIndex, setImageIndex] = useState(0);
  const { album, addToMySavedAlbums, clearSavedAlbums, getMySavedAlbums, removeFromMySavedAlbums } = useContext(context);

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

  const handleAddToMyAlbums = async (albumId) => {
    await addToMySavedAlbums(albumId);
    await clearSavedAlbums();
    await getMySavedAlbums();
  }
  const handleDeleteFromMyAlbums = async (albumId) => {
    await removeFromMySavedAlbums(albumId);
    await clearSavedAlbums();
    await getMySavedAlbums();
  }

  

  return (
    <div>
      {album.images && (
        <div
          className="album-inner-container"
          style={{ outline: "2px solid red" }}
        >
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
            <div onClick={() => handleAddToMyAlbums(album.id)}>save</div>
            <div onClick={() => handleDeleteFromMyAlbums(album.id)}>unsave</div>
            <h3>{album.tracks.items[0].artists[0].name}</h3>
            <h3>{album.name}</h3>
            {album.tracks.items.length !== 0 && (
              <div className="album-tracks">
                {album.tracks.items.map((item, index) => {
                  return (
                    <Track
                      key={index}
                      track={item.name}
                      trackItem={item}
                      trackNumber={item.track_number}
                      duration={item.duration_ms / 1000}
                      uri={item.uri}
                      trackId={item.id}
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
