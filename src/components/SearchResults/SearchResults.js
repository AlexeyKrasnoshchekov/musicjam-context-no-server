import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { context } from "../../context/context";
import Item from "../Item/Item";
import Track from "../Track/Track";
import "./SearchResults.css";

export default function SearchResults() {
  const {
    searchResult,
    getAlbum,
    addToMySavedAlbums,
    clearSavedAlbums,
    getMySavedAlbums,
  } = useContext(context);
  console.log("searchResult222", searchResult);
  const history = useHistory();
  const handleGetAlbum = async (id) => {
    await getAlbum(id);
    history.push(`/album/${id}`);
  };

  const handleAddToMyAlbums = async (albumId) => {
    await addToMySavedAlbums(albumId);
    await clearSavedAlbums();
    await getMySavedAlbums();
  };

  return (
    <div>
      {searchResult && (
        <div>
          {searchResult.albums && <div>
            <div>albums</div>
            <div className="albums-grid">
              {searchResult.albums.items.length !== 0 &&
                searchResult.albums.items.map((album, index) => {
                  return (
                    <Item
                      key={index}
                      albumId={album.id}
                      getAlbum={handleGetAlbum}
                      addAlbum={handleAddToMyAlbums}
                      name={album.name}
                      releaseDate={album.release_date}
                      tracksTotal={album.total_tracks}
                      artist={album.artists[0].name}
                      images={album.images}
                    />
                  );
                })}
            </div>
          </div>}
          )
          {searchResult.artists.items.length !== 0 && (
            <div>
              <div>artists</div>
              <div className="artists-grid">
                {searchResult.artists.items.map((artist, index) => {
                  return (
                    <Item
                      key={index}
                      // date={item.added_at}
                      name={artist.name}
                      popularity={artist.popularity}
                      genre={artist.genres[0]}
                      images={artist.images}
                    />
                  );
                })}
              </div>
            </div>
          )}
          {searchResult.tracks.items.length !== 0 && (
            <div>
              <div>tracks</div>
              <div>
                {searchResult.tracks.items.map((item, index) => {
                  return (
                    <Track
                      key={index}
                      // date={item.added_at}
                      artist={item.artists[0].name}
                      name={item.name}
                      album={item.album.name}
                      releaseDate={item.album.release_date}
                      uri={item.uri}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
