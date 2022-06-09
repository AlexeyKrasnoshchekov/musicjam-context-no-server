import { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { context } from "../../context/context";
import Track from "../Track/Track";
import "./Playlist.css";
// import AudioPlayer from 'react-h5-audio-player';
import "react-h5-audio-player/lib/styles.css";
import { Col, Image, Row, Table, Typography } from "antd";
import { DeleteOutlined, HeartOutlined } from "@ant-design/icons";

export default function Playlist() {
  const [imageIndex, setImageIndex] = useState(0);
  const [data, setData] = useState([]);
  const { Title } = Typography;

  const { playlist, playlistItems, getAlbum, removeFromPlaylist,addToMySavedTracks, clearSavedTracks, getMySavedTracks } =
    useContext(context);

    console.log("222", playlist);
  console.log("333", playlistItems);


  const history = useHistory();
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    playlistItems.length !==0 && setData([]);
    formatData();
  }, []);

  useEffect(() => {
    playlistItems.length !==0 && setData([]);
    formatData();
  }, [playlistItems]);

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
          onClick: (event) => {handleGetAlbum(record)}, // click row

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
      title: "Add to saved tracks",
      key: "",
      align: "center",
      render: () => <HeartOutlined />,
      onCell: (record, rowIndex) => {
        return {
          onClick: () => {
            let elem = data.filter((item, i) => rowIndex === i)[0];
            // console.log("elem", elem);
            // let trackId = elem.id;
            // console.log("trackId", trackId);
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
        console.log('item', item);
        // setTrackUri(item.uri);
        // setTrackId(item.id)

        setData1(
          item.track.name,
          item.track.artists[0].name,
          item.added_at.split("T")[0],
          item.track.album.release_date,
          item.track.album.name,
          item.track.duration_ms / 1000,
          item.track.id,
          item.track.uri,
        );
      });
  };

  const setData1 = (name, artist, added, released, album, duration, id, uri) => {
    let obj = {
      name: "",
      artist: "",
      added: "",
      released: "",
      album: "",
      duration: "",
      uri: "",
      id: "",
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
    // setData([]);
    setData((data) => [...data, obj]);
  };

  const handleGetAlbum = async (id) => {
    await getAlbum(id);
    history.push(`/album/${id}`);
  };
  
  return (
    <>
      <Row>
        <Col span={8}>
          <Image width={200} src={playlist.images[imageIndex].url} />
        </Col>
        <Col span={16}>
          <Title level={2}>{playlist.name}</Title>
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
    // <div>
    //   {playlist.images && (
    //     <div
    //       className="playlist-inner-container"
    //       style={{ outline: "2px solid red" }}
    //     >
    //       {playlist.images.length !== 0 && (
    //         <div
    //           style={{
    //             backgroundImage: `url(${playlist.images[imageIndex].url})`,
    //           }}
    //           className="playlist-image"
    //           alt="playlist picture"
    //         >
    //           {playlist.images.length > 1 && (
    //             <div
    //               style={{ fontSize: "18px", outline: "2px solid red" }}
    //               onClick={handlePrevButton}
    //             >
    //               {"<"}
    //             </div>
    //           )}

    //           {playlist.images.length > 1 && (
    //             <div
    //               style={{ fontSize: "18px", outline: "2px solid red" }}
    //               onClick={handleNextButton}
    //             >
    //               {">"}
    //             </div>
    //           )}
    //         </div>
    //       )}

    //       <div className="playlist-tracks-container">
    //         <h3>tracks</h3>
    //         {playlistItems.length !== 0 && (
    //           <div className="playlist-tracks">
    //             {playlistItems.map((item, index) => {
    //               return (
    //                 <div key={index}>
    //                   <Track

    //                   date={item.added_at}
    //                   albumId={item.track.album.id}
    //                   getAlbum={handleGetAlbum}
    //                   artist={item.track.artists[0].name}
    //                   track={item.track.name}
    //                   trackId={item.track.id}
    //                   album={item.track.album.name}
    //                   releaseDate={item.track.album.release_date}
    //                 />
    //                 <div onClick={() => {removeFromPlaylist(playlist.id, item.track.uri, item.track.id)}}>DEL</div>
    //                 </div>
    //               );
    //             })}
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   )}
    //   {/* <AudioPlayer /> */}
    // </div>
  );
}
