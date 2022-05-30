import React, { useContext, useEffect, useRef, useState } from "react";
import Container from "../components/Container/Container";
import { context } from "../store/context";

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
  }, []);
  return <div style={{height: '100%'}}>{isAuth && <Container>1111</Container>}</div>;
}
