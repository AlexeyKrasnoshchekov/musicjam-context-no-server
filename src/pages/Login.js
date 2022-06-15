import { useContext, useEffect, useRef, useState } from "react";
import { context } from "../context/context";
import { useHistory, useLocation } from "react-router-dom";
import { getAccessToken, setUrl } from "../util/helpers";
import { Button, Col, Row, Divider, Image } from "antd";

export default function Login() {
  const { setToken, setTokenIsSet, token } = useContext(context);
  const [authUrlIsSet, setAuthUrlIsSet] = useState(false);

  const initialRender = useRef(true);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (location.hash) {
      const tokenLocal = getAccessToken();
      setToken(tokenLocal);
      localStorage.setItem("token", tokenLocal);
      setTokenIsSet(true);
      history.push('/');
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
