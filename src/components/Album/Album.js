import { HeartOutlined, PlusSquareOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Dropdown,
  Image,
  Menu,
  Row,
  Space,
  Table,
  Typography,
} from "antd";

import { useContext, useEffect, useRef, useState } from "react";
import { context } from "../../context/context";
import Track from "../Track/Track";
import "./album.css";

export default function Album() {
  const [imageIndex, setImageIndex] = useState(0);
  const [albumIsSaved, setAlbumIsSaved] = useState(false);
  // const [trackUri, setTrackUri] = useState("");
  // const [trackId, setTrackId] = useState("");

  const [data, setData] = useState([]);
  const { Title } = Typography;

  const {
    album,
    addToMySavedAlbums,
    clearSavedAlbums,
    getMySavedAlbums,
    removeFromMySavedAlbums,
    addToPlaylist,
    playlists,
    addToMySavedTracks,
    clearSavedTracks,
    getMySavedTracks,
    mySavedAlbums
  } = useContext(context);

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    checkForSavedAlbum();
    album.tracks.items.length !== 0 && setData([]);
    formatData();
  }, []);

  useEffect(() => {
    album.tracks.items.length !== 0 && setData([]);
    formatData();
  }, [album]);


  const columns = [
    {
      title: "Track",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      align: "center",
    },
    {
      title: "Add to playlist",
      key: "",
      align: "center",
      render: (text, record, rowIndex) => (
        <Dropdown
          overlay={
            <Menu>
              {playlists.map((playlist, index) => {
                return (
                  <Menu.Item
                    key={index}
                    onClick={() => {
                      handleAddToPlaylist(
                        playlist.id,
                        data.filter((item, i) => rowIndex === i)[0].uri
                      );
                    }}
                  >
                    {playlist.name}
                  </Menu.Item>
                );
              })}
            </Menu>
          }
        >
          <Space>
            <PlusSquareOutlined />
            {/* <DownOutlined /> */}
          </Space>
        </Dropdown>
      ),
    },
    {
      title: "Add to saved tracks",
      key: "",
      align: "center",
      render: () => <HeartOutlined />,
      onCell: (record, rowIndex) => {
        return {
          onClick: () => {
            let elem = data.filter((item, i) => rowIndex === i)[0];
            console.log("elem", elem);
            let trackId = elem.id;
            console.log("trackId", trackId);
            handleAddTrack(trackId);
          },
        };
      },
    },
  ];

  const formatData = () => {
    album.tracks &&
      album.tracks.items.forEach((item) => {
        // console.log('item', item);
        // setTrackUri(item.uri);
        // setTrackId(item.id)

        setData1(
          item.name,
          item.track_number,
          item.duration_ms / 1000,
          item.uri,
          item.id
        );
      });
  };

  const setData1 = (name, trackNumber, duration, uri, id) => {
    let obj = {
      name: "",
      number: "",
      duration: "",
      uri: "",
      id: "",
    };

    let duration_min = Math.floor(duration / 60);
    let duration_sec = Math.round(duration % 60);

    obj.name = name;
    obj.number = trackNumber;
    obj.duration = `${duration_min}:${duration_sec}`;
    obj.uri = uri;
    obj.id = id;
    // setData([]);
    setData((data) => [...data, obj]);
  };

  const handleAddToMyAlbums = async () => {
    await addToMySavedAlbums(album.id);
    await clearSavedAlbums();
    await getMySavedAlbums();
    setAlbumIsSaved(state => !state);
  };
  const handleDeleteFromMyAlbums = async () => {
    await removeFromMySavedAlbums(album.id);
    await clearSavedAlbums();
    await getMySavedAlbums();
    setAlbumIsSaved(state => !state);
  };
  const handleAddTrack = async (trackId) => {
    console.log("trackId", trackId);
    await addToMySavedTracks(trackId);
    await clearSavedTracks();
    await getMySavedTracks();
  };

  const handleAddToPlaylist = (playlistId, trackUri) => {
    addToPlaylist(playlistId, trackUri);
  };

  const checkForSavedAlbum = () => {
    console.log('mySavedAlbums', mySavedAlbums);
    mySavedAlbums.length !==0 && mySavedAlbums.forEach(savedAlbum => {
      console.log('savedAlbum.id', savedAlbum.album.id);
      console.log('album.id', album.id);
      if (savedAlbum.album.id === album.id) {
        console.log('папапа');
        setAlbumIsSaved(true);
      }
    })
  }
  

  return (
    <>
      <Row>
        <Col span={8}>
          <Image width={300} src={album.images.length !== 0 && album.images[imageIndex].url} />
        </Col>
        <Col span={16}>
          <Title
            level={2}
          >{`${album.tracks.items[0].artists[0].name} - ${album.name}`}</Title>
          <Title level={4}>{`Released: ${album.release_date}`}</Title>
          <Title level={4}>{`Popularity: ${album.popularity}`}</Title>
          <Title level={4}>{`Total tracks: ${album.total_tracks}`}</Title>
          {albumIsSaved ? <Button onClick={() => handleDeleteFromMyAlbums()}>Unsave</Button> : <Button onClick={() => handleAddToMyAlbums()}>Save</Button>}
        </Col>
      </Row>

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
