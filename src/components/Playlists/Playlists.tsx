import { Button } from "antd";
import { useContext, useEffect, useMemo, useRef } from "react";
import { useHistory } from "react-router-dom";
import { context } from "../../context/context";
import { Playlist as PlaylistType } from "../../types/types";

export default function Playlists() {
  const { playlists, getPlaylists, getPlaylist, createPlaylist } = useContext(context);

  const initialRender = useRef(true);
  const history = useHistory();

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    playlists.length === 0 && getPlaylists();
  }, []);

  const handlePlaylistClick = async (id: string) => {
    console.log("111222");
    await getPlaylist(id);
    history.push("/playlist");
  };

  const handleCreatePlaylist = () => {
    const name = prompt("Please enter playlist name", "My playlist");

    createPlaylist(name);
  }

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
