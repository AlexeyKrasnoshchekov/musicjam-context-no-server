import React, { useContext, useState } from "react";
import { context } from "../../store/context";
import Album from "../Album/Album";
import Artist from "../Artist/Artist";
import Item from "../Item/Item";
import Track from "../Track/Track";

export default function SearchResults() {
  const { searchResult } = useContext(context);
  console.log("searchResult222", searchResult);
  return (
    <div>
      {searchResult && (
        <div>
          {searchResult.albums.items.length !== 0 && (
            <div>
              <div>albums</div>
              <div>
                {searchResult.albums.items.map((album, index) => {
                  return (
                    <Item
                      key={index}
                      // date={item.added_at}
                      name={album.name}
                      releaseDate={album.release_date}
                      tracksTotal={album.total_tracks}
                      artist={album.artists[0].name}
                      images={album.images}
                    />
                  );
                })}
              </div>
            </div>
          )}
          {searchResult.artists.items.length !== 0 && (
            <div>
              <div>artists</div>
              <div>
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
