import React, { useContext, useEffect, useRef } from "react";
import { context } from "../../context/context";

export default function SavedAlbums() {
  const { getSavedAlbums } = useContext(context);
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    getSavedAlbums();
  }, []);

  return <div>SavedAlbums</div>;
}
