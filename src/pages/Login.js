import { useContext, useEffect, useRef, useState } from "react";
import { context } from "../context/context";
import { useLocation } from "react-router-dom";
import { getAccessToken, setUrl } from "../util/Spotify";
import {  Button, Layout} from "antd";
const { Header, Footer, Sider, Content } = Layout;

export default function Login() {
  const { setToken, setTokenIsSet, token } = useContext(context);
  const [authUrlIsSet, setAuthUrlIsSet] = useState(false);

  const initialRender = useRef(true);
  const location = useLocation();

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (location.hash) {
      const tokenLocal = getAccessToken();
      setToken(tokenLocal);
      setTokenIsSet(true);
    }
  }, [authUrlIsSet]);

  const handleLogin = () => {
    if (token === "") {
      setUrl();
      setAuthUrlIsSet(true);
    } else {
      setTokenIsSet(true);
    }
  };

  return (
    <>
    <Layout>
      <Content>
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="Spotify-Logo"
      />
      <Button onClick={handleLogin} type="primary">LOGIN WITH SPOTIFY</Button>
      </Content>
    </Layout>
    </>
  );
}
