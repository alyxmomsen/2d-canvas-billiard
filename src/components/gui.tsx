import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { mainContext } from "../App";

export default function GUI() {
  const mainCTX = useContext(mainContext);

  return (
    <div>
      <h1>Mouse Display</h1>
      <p>
        {mainCTX.canvasRef?.current?.getBoundingClientRect().x}{" "}
        {mainCTX.canvasRef?.current?.getBoundingClientRect().y}
      </p>
    </div>
  );
}
