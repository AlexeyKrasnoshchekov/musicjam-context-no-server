import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { context } from "../../store/context";
import { Playlist as PlaylistType } from "../../types/types";
// import { Link } from "react-router-dom";
import Playlist from "../Playlist/Playlist";
// import Playlist from "../Playlist/Playlist";

export default function Playlists() {
  const { playlists, getPlaylists, getPlaylist } = useContext(context);

  const initialRender = useRef(true);

  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    getPlaylists();
  }, []);

  // const playlistLoading = useAppSelector(selectPlaylists);
  const handlePlaylistClick = async (id: string) => {
    console.log("111222");
    await getPlaylist(id);
    setClicked(true);
  };

  // const playlists = useAppSelector(selectPlaylists);

  console.log("playlists", playlists);
  // console.log('clicked', clicked);
  return (
    <>
      <div>Playlists</div>
      <div>
        {playlists.length !== 0 &&
          playlists.map((playlist: PlaylistType, index: number) => {
            return (
              <div key={index} onClick={() => handlePlaylistClick(playlist.id)} className="minicartButtonsContainer">
                <Link
                  style={{ color: "lightcyan" }}
                  to={`/playlist`}
                >
                  {playlist.tracks.total !== 0 && (
                    <div>{`${playlist.name} (${playlist.tracks.total})`}</div>
                  )}
                </Link>
              </div>
            );
          })}
      </div>
      {clicked && <Playlist />}
    </>
  );
}
