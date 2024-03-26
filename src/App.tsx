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
  setCanvasRef: React.Dispatch<React.SetStateAction<React.RefObject<HTMLCanvasElement> | null>> | null;
  mouseState: { x: number; y: number };
  setMouseState: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  > | null;
}>({
  canvasRef: null,
  setCanvasRef: null,
  mouseState: { x: Infinity, y: Infinity },
  setMouseState: null,
});

function App() {
  const [cnvsRef, setCnvsRef] = useState<React.RefObject<HTMLCanvasElement> | null>(null);

  const [mouseState, setMouseState] = useState({ x: Infinity, y: Infinity });

  const mainCTX = useContext(mainContext);

  return (
    <mainContext.Provider
      value={{
        canvasRef: cnvsRef,
        setCanvasRef: setCnvsRef,
        mouseState,
        setMouseState,
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
