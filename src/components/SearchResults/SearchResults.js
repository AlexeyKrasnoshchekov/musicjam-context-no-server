import { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { context } from "../../context/context";
import Item from "../Item/Item";
import Track from "../Track/Track";
import "./SearchResults.css";
import { Button, Card, Dropdown, Menu, Space, Table, Typography } from "antd";
import { HeartOutlined, PlusSquareOutlined } from "@ant-design/icons";

export default function SearchResults() {
  const { Title } = Typography;

  const {
    searchResult,
    getAlbum,
    addToMySavedAlbums,
    clearSavedAlbums,
    getMySavedAlbums,
    playlists,
    mySavedAlbums,
    clearSavedTracks,
    getMySavedTracks,
    addToPlaylist,
    addToMySavedTracks,
  } = useContext(context);
  console.log("searchResult222", searchResult);

  const history = useHistory();

  // const [albumIsSaved, setAlbumIsSaved] = useState(false);
  const [data, setData] = useState([]);

  // const initialRender = useRef(true);

  useEffect(() => {
    // checkForSavedAlbum();
    searchResult && searchResult.tracks && searchResult.tracks.items.length !== 0 && setData([]);
    searchResult && searchResult.tracks && searchResult.tracks.items.length !== 0 && formatData();
  }, [searchResult]);

  const handleGetAlbum = async (id) => {
    await getAlbum(id);
    history.push(`/album/${id}`);
  };

  const handleAddToMyAlbums = async (albumId) => {
    await addToMySavedAlbums(albumId);
    await clearSavedAlbums();
    await getMySavedAlbums();
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
      // render: (text) => <a href="#" onClick={() => {handleArtistSearch(text)}}>{text}</a>,
    },
    {
      title: "Album",
      dataIndex: "album",
      key: "album",
      render: (text) => <a>{text}</a>,
      onCell: (record, rowIndex) => {
        return {
          onClick: () => {
            let elem = searchResult.tracks.items.filter((item, i) => rowIndex === i)[0];
            handleGetAlbum(elem.album.id);
          }, // click row
        };
      },
    },
    {
      title: "Popularity",
      dataIndex: "popularity",
      key: "popularity",
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
  ];

  const formatData = () => {
    // let dataArr = [];
    searchResult.tracks.items.length !== 0 &&
      searchResult.tracks.items.forEach((item) => {
        setData1(
          item.name,
          item.artists[0].name,
          item.album.name,
          item.album.release_date,
          item.duration_ms / 1000,
          item.popularity,
          item.uri,
          item.id
        );
      });
  };

  const setData1 = (name, artist, album, released, duration, popularity, uri, id) => {
    let obj = {
      added: "",
      name: "",
      artist: "",
      album: "",
      released: "",
      duration: "",
      popularity: 0,
      uri: "",
      id: "",
    };

    let duration_min = Math.floor(duration / 60);
    let duration_sec = Math.round(duration % 60);

    obj.name = name;
    obj.artist = artist;
    obj.album = album;
    obj.released = released;
    obj.popularity = popularity;
    obj.duration = `${duration_min}:${duration_sec}`;
    obj.uri = uri;
    obj.id = id;
    // setData([]);
    setData((data) => [...data, obj]);
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
    <div>
      {searchResult && (
        <div>
          {searchResult.albums && (
            <div>
              {/* <div>albums</div> */}
              <Title level={4}>Albums</Title>
              <div className="albums-grid">
                {searchResult.albums.items.length !== 0 &&
                  searchResult.albums.items.map((album, index) => {
                    return (
                      <Card
                        title={album.name}
                        extra={<a href="#" onClick={() => {handleGetAlbum(album.id)}}>More</a>}
                        style={{
                          width: 300,
                          height: 300,
                          backgroundImage: `url(${album.images[1].url})`,
                        }}
                        bodyStyle={{
                          color: 'lightgray',
                          height: "calc(100% - 3rem",
                          backgroundColor: "rgba(000, 000, 000, 0.5)",
                        }}
                        headStyle={{
                          color: 'lightgray',
                          height: "3rem",
                          backgroundColor: "rgba(000, 000, 000, 0.5)",
                        }}
                      >
                        <p>{`Artist: ${album.artists[0].name}`}</p>
                        <p>{`Released: ${album.release_date}`}</p>
                        <p>{`Total tracks: ${album.total_tracks}`}</p>
                        {mySavedAlbums.filter(savedAlbum => savedAlbum.album.id === album.id).length === 0 && <Button onClick={()=> {handleAddToMyAlbums(album.id)}}>Save</Button>}
                      </Card>
                      // <Item
                      //   key={index}
                      //   albumId={album.id}
                      //   getAlbum={handleGetAlbum}
                      //   addAlbum={handleAddToMyAlbums}
                      //   name={album.name}
                      //   releaseDate={album.release_date}
                      //   tracksTotal={album.total_tracks}
                      //   artist={album.artists[0].name}
                      //   images={album.images}
                      // />
                    );
                  })}
              </div>
            </div>
          )}
          {searchResult.artists.items.length !== 0 && (
            <div>
              <Title level={4}>Artists</Title>
              <div className="artists-grid">
                {searchResult.artists.items &&
                  searchResult.artists.items.map((artist, index) => {
                    // console.log('artist.images[1]', artist.images[1].url)
                    return (
                      <Card
                        title={artist.name}
                        extra={<a href="#">More</a>}
                        style={{
                          
                          width: 300,
                          height: 300,
                          backgroundImage: `url(${
                            artist.images.length !== 0 && artist.images[1].url
                          })`,
                        }}
                        bodyStyle={{
                          color: 'lightgray',
                          height: "calc(100% - 3rem",
                          backgroundColor: "rgba(000, 000, 000, 0.5)",
                        }}
                        headStyle={{
                          color: 'lightgray',
                          height: "3rem",
                          backgroundColor: "rgba(000, 000, 000, 0.5)",
                        }}
                      >
                        <p>{`Genres: ${artist.genres.join('; ')}`}</p>
                        <p>{`Popularity: ${artist.popularity}`}</p>
                      </Card>
                      // <Item
                      //   key={index}
                      //   // date={item.added_at}
                      //   name={artist.name}
                      //   popularity={artist.popularity}
                      //   genre={artist.genres[0]}
                      //   images={artist.images}
                      // />
                    );
                  })}
              </div>
            </div>
          )}
          {/* {searchResult.tracks.items.length !== 0 && ( */}
            <div>
            <Title level={4}>Tracks</Title>
              <div>
                {data && (
                  <Table
                    pagination={false}
                    columns={columns}
                    dataSource={data}
                  />
                )}
                {/* {searchResult.tracks.items.map((item, index) => {
                  return (
                    <Track
                      key={index}
                      // date={item.added_at}
                      artist={item.artists[0].name}
                      name={item.name}
                      album={item.album.name}
                      releaseDate={item.album.release_date}
                      uri={item.uri}
                    />
                  );
                })} */}
              </div>
            </div>
          {/* )} */}
        </div>
      )}
    </div>
  );
}
