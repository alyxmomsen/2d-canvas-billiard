import { useContext, useEffect, useRef, useState } from "react";
import BillardGame from "./billard-game";
import { mainContext } from "../App";

export default function Canvas() {
  const mainCTX = useContext(mainContext);

  const [game] = useState<BillardGame>(new BillardGame());

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      if (ctx) {
        if (mainCTX.setCanvasRef) {
          mainCTX.setCanvasRef(canvasRef);
        }

        const refrash = () => {

          // console.log(mainCTX.mouseState.x);
          
          game.update({ mouseState: mainCTX.mouseState});
          game.render({ ctx, mouseState: mainCTX.mouseState }); 

          window.requestAnimationFrame(refrash);
        };

        window.requestAnimationFrame(refrash);
      }
    }
  }, []);

  return <canvas id="my-canvas" width={800} height={600} ref={canvasRef} />;
}
