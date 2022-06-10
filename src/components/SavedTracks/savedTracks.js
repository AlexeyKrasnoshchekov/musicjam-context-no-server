import React, { useContext, useEffect, useRef, useState } from "react";
import { context } from "../../context/context";
import { Table, Space } from "antd";
import { useHistory } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

export default function SavedAlbums() {
  const { getMySavedTracks, mySavedTracks, removeFromMySavedTracks, getAlbum } = useContext(context);
  const [data, setData] = useState([]);
  const history = useHistory();
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    mySavedTracks.length === 0 && getMySavedTracks();
  }, []);

  useEffect(() => {
    mySavedTracks.length !==0 && setData([]);
    formatData();
  }, [mySavedTracks]);

  console.log('mySavedTracks', mySavedTracks);

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
      // render: (text) => <a href="#" onClick={() => {handleArtistSearch(text)}}>{text}</a>,
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
      onCell: (record, rowIndex) => {
        return {
          
          onClick: (event) => {
            let elem = mySavedTracks.filter((item, i) => rowIndex === i)[0];
            handleGetAlbum(elem.track.album.id);
          }, // click row

        };
      }
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
    {
      title: "Del",
      key: "del",
      render: () => <DeleteOutlined />,
      onCell: (record, rowIndex) => {
        return {
          onClick: (event) => {handleSavedTrackDelete(rowIndex)}, // click row

        };
      }
    },
  ];

  const handleGetAlbum = async (id) => {
    await getAlbum(id);
    history.push(`/album/${id}`);
  };

  const formatData = () => {
    // let dataArr = [];
    mySavedTracks.length !== 0 &&
      mySavedTracks.forEach((item) => {
        setData1(
          item.added_at.split("T")[0],
          item.track.name,
          item.track.artists[0].name,
          item.track.album.name,
          item.track.album.release_date,
          item.track.duration_ms / 1000
        );
      });
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

    let duration_min = Math.floor(duration / 60);
    let duration_sec = Math.round(duration % 60);

    obj.added = added;
    obj.name = name;
    obj.artist = artist;
    obj.album = album;
    obj.released = released;
    obj.duration = `${duration_min}:${duration_sec}`;
    // setData([]);
    setData((data) => [...data, obj]);
  };

  console.log("mySavedTracks", mySavedTracks);

  // const { playlists, getAlbum, getPlaylists, getPlaylist, search, mySavedAlbums, getMySavedAlbums, mySavedTracks, getMySavedTracks } = useContext(context);

  

  const handleSavedTrackDelete = async (rowIndex) => {
    await removeFromMySavedTracks(rowIndex);
    mySavedTracks.length !==0 && setData([]);
    formatData();
  }

  return (
    <>
      {data && (
        <Table
          columns={columns}
          dataSource={data}
          
        />
      )}
    </>
  );
}
