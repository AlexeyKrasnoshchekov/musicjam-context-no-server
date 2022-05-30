import React, { useContext, useEffect, useRef } from "react";
// import { useAppDispatch } from "../../hooks/redux";
import Header from "../Header/Header";
import { context } from "../../store/context";
// import { loadPlaylists } from "../Playlists/playlistsSlice";
import Sidebar from "../Sidebar/Sidebar";
import "./container.css";
import { Redirect } from "react-router-dom";

export default function Container(props) {
  const { tokenIsSet, auth } = useContext(context);
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    auth(auth);
  }, []);

  // const renderContainer = () => {
  //   console.log('tokenIsSet333', tokenIsSet)
  //   if (!tokenIsSet) {
  //     return <Redirect to="/" />
  //   } else {
  //     return (
  //       <div className="home">
  //         <Header />
  //         <Sidebar />
  //         <main id="main">{props.children}</main>
  //       </div>
  //     );
  //   }
  // };
  return (
    <div className="home">
      <Header />
      <div style={{display: 'flex'}}>
        <Sidebar />
        <main id="main">{props.children}</main>
      </div>
    </div>
  );
}
