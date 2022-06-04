import { Button } from "antd";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { context } from "../../store/context";
import { Playlist as PlaylistType } from "../../types/types";
// import { Link } from "react-router-dom";
// import Playlist from "../Playlist/Playlist";
// import Playlist from "../Playlist/Playlist";

export default function Playlists() {
  const { playlists, getPlaylists, getPlaylist, createPlaylist } = useContext(context);

  const initialRender = useRef(true);
  const history = useHistory();

  // const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    playlists.length === 0 && getPlaylists();
    // playlists.length === 0 && getSavedAlbums();
  }, []);

  // const playlistLoading = useAppSelector(selectPlaylists);
  const handlePlaylistClick = async (id: string) => {
    console.log("111222");
    await getPlaylist(id);
    history.push("/playlist");
    // setClicked(true);
  };

  const handleCreatePlaylist = () => {
    const name = prompt("Please enter playlist name", "My playlist");

    createPlaylist(name);
  }

  // const onItemClick = useCallback(async (id:string) => {
  //   console.log('You clicked ', event.currentTarget);
  // }, [id]);

  // const playlists = useAppSelector(selectPlaylists);

  console.log("playlists", playlists);

  return useMemo(() => {
    // The rest of your rendering logic
    return (
      <>
        <div>Playlists</div>
        <div>
          {playlists.length !== 0 &&
            playlists.map((playlist: PlaylistType, index: number) => {
              return (
                <div
                  key={index}
                  onClick={() => handlePlaylistClick(playlist.id)}
                >
                  {playlist.tracks.total !== 0 && (
                    <div>{`${playlist.name} (${playlist.tracks.total})`}</div>
                  )}
                </div>
              );
            })}
        </div>
        <Button onClick={handleCreatePlaylist} type="primary">Create</Button>
      </>
    );
  }, [playlists]);
}
