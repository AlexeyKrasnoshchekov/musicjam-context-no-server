import React from "react";
// import { useAppDispatch } from "../../hooks/redux";
import Header from "../Header/Header";
// import { loadPlaylists } from "../Playlists/playlistsSlice";
import Sidebar from "../Sidebar/Sidebar";
import './container.css'

export default function Container(props) {
  // const dispatch = useAppDispatch();
  // dispatch(loadPlaylists());
  return (
    <div className="home">
      <Header/>
      <Sidebar/>
      <main id="main">{props.children}</main>
    </div>
  );
}
