import { HeartOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Col, Divider, Dropdown, Image, Menu, Row, Space, Table, Typography } from "antd";

import { useContext, useEffect, useRef, useState } from "react";
import { context } from "../../context/context";
import Track from "../Track/Track";
import "./album.css";

export default function Album() {
  const [imageIndex, setImageIndex] = useState(0);
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
  } = useContext(context);

  const handlePrevButton = () => {
    if (imageIndex > 0 && imageIndex <= album.images.length) {
      setImageIndex((prevState) => {
        return { imageIndex: --prevState.imageIndex };
      });
    } else {
      setImageIndex({
        imageIndex: album.images.length - 1,
      });
    }
  };
  const handleNextButton = () => {
    if (imageIndex >= 0 && imageIndex < album.images.length - 1) {
      setImageIndex((prevState) => {
        return { imageIndex: ++prevState.imageIndex };
      });
    } else {
      setImageIndex({
        imageIndex: 0,
      });
    }
  };

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    album.tracks.items.length !== 0 && setData([]);
    formatData();
  }, []);

  useEffect(() => {
    album.tracks.items.length !== 0 && setData([]);
    formatData();
  }, [album]);

  const menu = (
    <Menu>
      {playlists.map((playlist, index) => {
        return (
          <Menu.Item
            key={index}
            onClick={() => {
              handleAddToPlaylist(playlist.id);
            }}
          >
            {playlist.name}
          </Menu.Item>
        );
      })}
    </Menu>
  );

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

  const handleAddToMyAlbums = async (albumId) => {
    await addToMySavedAlbums(albumId);
    await clearSavedAlbums();
    await getMySavedAlbums();
  };
  const handleDeleteFromMyAlbums = async (albumId) => {
    await removeFromMySavedAlbums(albumId);
    await clearSavedAlbums();
    await getMySavedAlbums();
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

  return (
    <>
      <Row>
        <Col span={8}>
          <Image
            width={300}
            src={album.images[imageIndex].url}
          />
        </Col>
        <Col span={16}>
        <Title level={2}>{`${album.tracks.items[0].artists[0].name} - ${album.name}`}</Title>
        <Title level={4}>{`Released: ${album.release_date}`}</Title>
        <Title level={4}>{`Popularity: ${album.popularity}`}</Title>
        <Title level={4}>{`Total tracks: ${album.total_tracks}`}</Title>
        </Col>
      </Row>
      <Divider plain={true}/>
      <Row>
        <Col span={24}>
          {data && (
            <Table pagination={false} columns={columns} dataSource={data} />
          )}
        </Col>
      </Row>
    </>

    // <div>
    //   {album.images && (
    //     <div
    //       className="album-inner-container"
    //       style={{ outline: "2px solid red" }}
    //     >
    //       {album.images.length !== 0 && (
    //         <div
    //           style={{
    //             backgroundImage: `url(${album.images[imageIndex].url})`,
    //           }}
    //           className="album-image"
    //           alt="album picture"
    //         >
    //           {album.images.length > 1 && (
    //             <div
    //               style={{ fontSize: "18px", outline: "2px solid red" }}
    //               onClick={handlePrevButton}
    //             >
    //               {"<"}
    //             </div>
    //           )}

    //           {album.images.length > 1 && (
    //             <div
    //               style={{ fontSize: "18px", outline: "2px solid red" }}
    //               onClick={handleNextButton}
    //             >
    //               {">"}
    //             </div>
    //           )}
    //         </div>
    //       )}

    //       <div className="album-tracks-container">
    //         <div onClick={() => handleAddToMyAlbums(album.id)}>save</div>
    //         <div onClick={() => handleDeleteFromMyAlbums(album.id)}>unsave</div>
    //         <h3>{album.tracks.items[0].artists[0].name}</h3>
    //         <h3>{album.name}</h3>
    //         {album.tracks.items.length !== 0 && (
    //           <div className="album-tracks">
    //             {album.tracks.items.map((item, index) => {
    //               return (
    //                 <Track
    //                   key={index}
    //                   track={item.name}
    //                   trackItem={item}
    //                   trackNumber={item.track_number}
    //                   duration={item.duration_ms / 1000}
    //                   uri={item.uri}
    //                   trackId={item.id}
    //                 />
    //               );
    //             })}
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
}
