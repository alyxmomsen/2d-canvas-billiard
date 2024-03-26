import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import logo from "./logo.svg";
import "./App.css";
import Canvas from "./components/canvas";
import GUI from "./components/gui";
export const mainContext = createContext<{
  canvasRef: React.RefObject<HTMLCanvasElement> | null;
  setCanvasRef: React.Dispatch<
    React.SetStateAction<React.RefObject<HTMLCanvasElement> | null>
  > | null;
}>({
  canvasRef: null,
  setCanvasRef: null,
});

function App() {
  const [cnvsRef, setCnvsRef] =
    useState<React.RefObject<HTMLCanvasElement> | null>(null);

  return (
    <mainContext.Provider
      value={{
        canvasRef: cnvsRef,
        setCanvasRef: setCnvsRef,
      }}
    >
      <div className="App">
        <Canvas />
        <GUI />
      </div>
    </mainContext.Provider>
  );
}

export default App;
