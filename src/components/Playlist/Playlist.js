import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { context } from "../../context/context";
import { Col, Image, Row, Table, Typography } from "antd";
import { DeleteOutlined, HeartOutlined } from "@ant-design/icons";

export default function Playlist() {
  const [imageIndex, setImageIndex] = useState(0);
  const [data, setData] = useState([]);
  const { Title } = Typography;
  const { id } = useParams();

  const {
    token,
    refreshPage,
    playlist,
    playlistItems,
    clearPlaylistItems,
    getPlaylist,
    removeFromPlaylist,
    addToMySavedTracks,
    clearSavedTracks,
    getMySavedTracks,
    mySavedTracks,
  } = useContext(context);
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    handleGetPlaylist(id);
  }, [id]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    token === "" && refreshPage();
  }, [token]);

  useEffect(() => {
    playlistItems.length !== 0 && setData([]);
    formatData();
  }, [playlistItems]);

  const handleGetPlaylist = async (id) => {
    console.log("id11122", id);
    await clearPlaylistItems();
    await getPlaylist(id);
  };

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
      render: (text, record, rowIndex) => {
        let elem = data.filter((item, i) => rowIndex === i)[0];
        return <Link to={`/artist/${elem.artistId}`}>{elem.artist}</Link>;
      },
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
      render: (text, record, rowIndex) => {
        let elem = data.filter((item, i) => rowIndex === i)[0];
        return <Link to={`/album/${elem.albumId}`}>{elem.album}</Link>;
      },
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
      title: "Add to saved tracks",
      key: "",
      align: "center",
      render: (text, record, rowIndex) => {
        let elem = data.filter((item, i) => rowIndex === i)[0];
        if (
          mySavedTracks.filter((item) => item.track.id === elem.id).length === 0
        ) {
          return <HeartOutlined />;
        }
      },
      onCell: (record, rowIndex) => {
        return {
          onClick: () => {
            let elem = data.filter((item, i) => rowIndex === i)[0];
            handleAddTrack(elem.id);
          },
        };
      },
    },
    {
      title: "Remove from playlist",
      key: "",
      align: "center",
      render: () => <DeleteOutlined />,
      onCell: (record, rowIndex) => {
        return {
          onClick: () => {
            let elem = data.filter((item, i) => rowIndex === i)[0];
            console.log("elem", elem);
            removeFromPlaylist(playlist.id, elem.uri, elem.id);
          },
        };
      },
    },
  ];

  const handleAddTrack = async (trackId) => {
    console.log("trackId", trackId);
    await addToMySavedTracks(trackId);
    await clearSavedTracks();
    await getMySavedTracks();
  };

  const formatData = () => {
    playlistItems &&
      playlistItems.forEach((item) => {
        console.log("item", item);

        createDataObj(
          item.track.name,
          item.track.artists[0].name,
          item.added_at.split("T")[0],
          item.track.album.release_date,
          item.track.album.name,
          item.track.duration_ms / 1000,
          item.track.id,
          item.track.uri,
          item.track.artists[0].id,
          item.track.album.id
        );
      });
  };

  const createDataObj = (
    name,
    artist,
    added,
    released,
    album,
    duration,
    id,
    uri,
    artistId,
    albumId
  ) => {
    let obj = {
      name: "",
      artist: "",
      added: "",
      released: "",
      album: "",
      duration: "",
      uri: "",
      id: "",
      artistId: "",
      albumId: "",
    };

    let duration_min = Math.floor(duration / 60);
    let duration_sec = Math.round(duration % 60);

    obj.name = name;
    obj.artist = artist;
    obj.added = added;
    obj.released = released;
    obj.album = album;
    obj.duration = `${duration_min}:${duration_sec}`;
    obj.id = id;
    obj.uri = uri;
    obj.artistId = artistId;
    obj.albumId = albumId;
    setData((data) => [...data, obj]);
  };

  return (
    <>
      {playlist && (
        <Row>
          <Col
            md={{ backgroundColor: "red" }}
            sm={{ backgroundColor: "blue" }}
            span={8}
          >
            <Image width={200} src={playlist.images[imageIndex].url} />
          </Col>
          <Col span={16}>
            <Title level={2}>{playlist.name}</Title>
          </Col>
        </Row>
      )}

      <Row>
        <Col span={24}>
          {data && (
            <Table pagination={false} columns={columns} dataSource={data} />
          )}
        </Col>
      </Row>
    </>
  );
}
