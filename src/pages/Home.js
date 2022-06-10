import { useContext, useEffect, useRef, useState } from "react";
import Container from "../components/Container/Container";
import Recomendations from "../components/Recomendations/Recomendations";
import { context } from "../context/context";
import { notification } from "antd";

export default function Home() {
  const [isAuth, setIsAuth] = useState(false);
  const { auth, token } = useContext(context);
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    token !== "" && auth();
    setIsAuth(true);

    token !=="" && notification.open({
      message: 'Spotify token',
      description:
        'Token successfully set/refreshed, you can continue',
      duration: 3 
    });

  }, []);
  return (
    <div style={{ height: "100%" }}>
      {isAuth && (
        <Container>
          <Recomendations />
        </Container>
      )}
    </div>
  );
}
