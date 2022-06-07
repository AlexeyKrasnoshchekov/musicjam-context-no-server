import React, { useContext, useEffect, useRef } from "react";
import { context } from "../../context/context";

export default function Recomendations() {
  const { getRecommendations } =
    useContext(context);
  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    getRecommendations();
  }, []);
  return <div>Recomendations111</div>;
}
