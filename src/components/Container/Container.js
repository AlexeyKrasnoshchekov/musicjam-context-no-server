import React, { useContext, useEffect, useRef } from "react";
// import { useAppDispatch } from "../../hooks/redux";
import Header from "../Header/Header";
import { context } from "../../store/context";
// import { loadPlaylists } from "../Playlists/playlistsSlice";
import "./container.css";
import { Redirect } from "react-router-dom";
import Playlists from "../Playlists/Playlists";
import SavedAlbums from "../SavedAlbums/savedAlbums";

export default function Container(props) {
  const { tokenIsSet, auth } = useContext(context);
  const initialRender = useRef(true);

  // const { getPlaylists } = useContext(context);

  // useEffect(() => {
  //   if (initialRender.current) {
  //     initialRender.current = false;
  //     return;
  //   }

  //   auth(auth);
  //   getPlaylists();
    
  // }, []);

  return (
    <div className="home">
      <Header />
      <div style={{ display: "flex", minHeight: '94%', color: 'lightcyan' }}>
        <div className="sidebar">
          <Playlists />
          {/* <SavedAlbums /> */}
        </div>
        <main id="main" style={{width: '100%', paddingTop: '2rem', paddingBottom: '2rem', paddingLeft: '2rem'}}>{props.children}</main>
      </div>
    </div>
  );
}
