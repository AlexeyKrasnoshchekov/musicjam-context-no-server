import React, { useContext, useEffect, useRef, useState } from "react";
import { context } from "../../context/context";
import { Table, Space } from "antd";

export default function SavedAlbums() {
  const { mySavedTracks } = useContext(context);
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Artist",
      key: "artist",
      dataIndex: "artist",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Added",
      dataIndex: "added",
      key: "added",
    },
    {
      title: "Album",
      dataIndex: "album",
      key: "album",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Released",
      dataIndex: "released",
      key: "released",
    },

    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
  ];

  const formatData = () => {
    
    // let dataArr = [];
    mySavedTracks.length !== 0 &&
      mySavedTracks.forEach((item) => setData1(item.added_at, item.track.name, item.track.artists[0].name, item.track.album.name, item.track.album.release_date, item.track.duration_ms));
  };

  const setData1 = (added, name, artist, album, released, duration) => {
    let obj = {
      added: "",
      name: "",
      artist: "",
      album: "",
      released: "",
      duration: "",
    };

    obj.added = added;
    obj.name = name;
    obj.artist = artist;
    obj.album = album;
    obj.released = released;
    obj.duration = duration;
    console.log("data888", data);
    setData((data) => [...data, obj]);
  };

  console.log("mySavedTracks", mySavedTracks);
  
  // const { playlists, getAlbum, getPlaylists, getPlaylist, search, mySavedAlbums, getMySavedAlbums, mySavedTracks, getMySavedTracks } = useContext(context);
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    formatData();
  }, []);

  return <>{data && <Table columns={columns} dataSource={data} />}</>;
}
