import { useContext, useEffect, useRef, useState } from "react";
import { context } from "../context/context";
import { useLocation } from "react-router-dom";
import { getAccessToken, setUrl } from "../util/helpers";
import { Button, Col, Row, Divider, Image } from "antd";

export default function Login() {
  const { setToken, setTokenIsSet, token,tokenIsSet } = useContext(context);
  const [authUrlIsSet, setAuthUrlIsSet] = useState(false);

  const initialRender = useRef(true);
  const location = useLocation();

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    console.log('333');
    if (location.hash) {
      const tokenLocal = getAccessToken();
      console.log('first',tokenLocal);
      setToken(tokenLocal);
      localStorage.setItem("token", tokenLocal);
      console.log('setTokenIsSet111',tokenIsSet);
      setTokenIsSet(true);
      console.log('setTokenIsSet222',tokenIsSet);
      location = "https://musicjam2.vercel.app/";
    }
  }, [authUrlIsSet]);

  const handleLogin = () => {
    if (token === "") {
      console.log('222');
      setUrl();
      setAuthUrlIsSet(true);
    } else {
      setTokenIsSet(true);
    }
  };

  setInterval(() => {
    setUrl();

    if (location.hash) {
      const tokenLocal = getAccessToken();
      localStorage.setItem("token", tokenLocal);
      // setTokenExpiresIn(tokenLocal.expiresIn);
      setToken(tokenLocal);
      setTokenIsSet(true);
    }
  }, 3600 * 1000); //one hour

  return (
    <Row align="middle" style={{ height: "100%" }}>
      <Col span={24}>
        <Row justify="center" align="bottom">
          <Image
            width={"80%"}
            preview={false}
            src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
            alt="Spotify-Logo"
          />
          <Divider />
          <Button
            xs={{ size: "small" }}
            sm={{ size: "middle" }}
            md={{ size: "middle" }}
            lg={{ size: "large" }}
            xl={{ size: "large" }}
            // size={"large"}
            onClick={handleLogin}
            type="primary"
          >
            LOGIN WITH SPOTIFY
          </Button>
        </Row>
      </Col>
    </Row>
  );
}
