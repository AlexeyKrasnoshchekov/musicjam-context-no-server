import React, { useContext, useState } from "react";
import { context } from "../../store/context";
import Track from "../Track/Track";

export default function SearchResults() {
  const { searchResult } = useContext(context);
  console.log("searchResult222", searchResult);
  return (
    <div>
      {searchResult && (
        <div>
          {searchResult.albums.items.length !==0 && <div>
            <div>albums</div>
            <div>
              {searchResult.albums.items.map((album, index) => {
                return (
                  <div key={index}>
                    <div>{album.name}</div>
                    <div>{album.release_date}</div>
                    <div>{album.total_tracks}</div>
                  </div>
                );
              })}
            </div>
          </div>}
          {searchResult.artists.items.length !==0 &&<div>
            <div>artists</div>
            <div>
              {searchResult.artists.items.map((artist, index) => {
                return (
                  <div key={index}>
                    <div>{artist.name}</div>
                    <div>{artist.popularity}</div>
                    <div>{artist.genres[0]}</div>
                    {/* <div>{artist.images}</div> */}
                  </div>
                );
              })}
            </div>
          </div>}
          {/* {searchResult.tracks.items.length !==0 && <div>
            <div>tracks</div>
            <div>
              {searchResult.tracks.items.map((item, index) => {
                return (
                  <Track
                    key={index}
                    date={item.added_at}
                    // artist={item.track.artists[0].name}
                    track={item.track.name}
                    album={item.track.album.name}
                    releaseDate={item.track.album.release_date}
                  />
                );
              })}
            </div>
          </div>} */}
        </div>
      )}
    </div>
  );
}
