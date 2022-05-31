import React, { useContext, useEffect, useRef } from "react";
// import { useAppDispatch } from "../../hooks/redux";
import Header from "../Header/Header";
import { context } from "../../store/context";
// import { loadPlaylists } from "../Playlists/playlistsSlice";
import "./container.css";
import { Redirect } from "react-router-dom";
import Playlists from "../Playlists/Playlists";

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
        </div>
        <main id="main">{props.children}</main>
      </div>
    </div>
  );
}
