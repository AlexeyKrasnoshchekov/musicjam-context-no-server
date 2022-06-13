import { useContext, useEffect, useRef, useState } from "react";
import MyHeader from "../Header/Header";
import { Link, matchPath, useRouteMatch } from "react-router-dom";

import {
  Layout,
  Menu,
  Modal,
  Input,
  Button,
} from "antd";

import {
  UnorderedListOutlined,
  PlaySquareOutlined,
  HeartOutlined,
} from "@ant-design/icons";

import { context } from "../../context/context";
import { useHistory } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
const { Header, Content, Sider } = Layout;

const Container = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    playlists,
    createPlaylist,
    getPlaylists,
    mySavedAlbums,
    getMySavedAlbums,
    clearPlaylists,
  } = useContext(context);

  const [playlistName, setPlaylistName] = useState("");

  const initialRender = useRef(true);
  const history = useHistory();
  
  const {path} =  useRouteMatch();
  const isHome = matchPath(path, {
    path: "/",
    exact: true,
    strict: false,
  });
  console.log('isHome', isHome);
  // console.log('match', match.url);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    await createPlaylist(playlistName);
    await clearPlaylists();
    await getPlaylists();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    playlists.length === 0 && getPlaylists();
    mySavedAlbums.length === 0 && getMySavedAlbums();
  }, []);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["sub1"]}
          style={{
            height: "100%",
          }}
        >
          <SubMenu
            key="sub1"
            title="Playlists"
            icon={<UnorderedListOutlined />}
          >
            <>
              <Menu.Item key="1">
                <Button onClick={() => showModal()}>Create</Button>
              </Menu.Item>
              <Modal
                title="New playlist"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <Input
                  maxLength={20}
                  onChange={(e) => {
                    setPlaylistName(e.target.value);
                  }}
                  placeholder="enter playlist name"
                />
              </Modal>
              {playlists.map((playlist, index) => {
                const subKey = 1 + index + 1;
                return (
                  <Menu.Item
                    key={subKey}
                  >
                    <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
                  </Menu.Item>
                );
              })}
            </>
          </SubMenu>
          <SubMenu
            key="sub2"
            title="Saved Albums"
            icon={<PlaySquareOutlined />}
          >
            {mySavedAlbums.map((item, index) => {
              const subKey = 1 + playlists.length + index + 1;
              return (
                <Menu.Item
                  key={subKey}
                ><Link to={`/album/${item.album.id}`}> 
                {`${item.album.name} (${item.album.artists[0].name})`}
                </Link>
                  
                  </Menu.Item>
              );
            })}
          </SubMenu>
          <Menu.Item
            key={1 + playlists.length + mySavedAlbums.length + 1}
            icon={<HeartOutlined />}
            onClick={() => {
              history.push(`/savedtracks`);
            }}
          >
            Saved Tracks
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header>
          {/* <div className="logo" /> */}
          <MyHeader />
        </Header>
        <Content
          className={isHome && "home"}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 20,
            }}
          >
            {props.children}
          </div>
        </Content>

      </Layout>
    </Layout>
  );
};

export default Container;


