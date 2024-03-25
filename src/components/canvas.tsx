import { useEffect, useRef, useState } from "react";
import BillardGame from "./billard-game";

export default function Canvas() {
  const [game ,] = useState<BillardGame>(new BillardGame());

  const canvasRef = useRef<HTMLCanvasElement>(null);


  

  useEffect(() => {
    if (canvasRef.current) {

        

      const ctx = canvasRef.current.getContext("2d");

      if (ctx) {
        const refrash = () => {
          console.log("refrash");

            game.update() ;
            game.render(ctx);


          window.requestAnimationFrame(refrash);
        };

        window.requestAnimationFrame(refrash);

        
      }
    }
  }, []);

  return <canvas width={800} height={600} ref={canvasRef} />;
}
