import Gradient from "../../gradient";
import { useEffect } from "react";

const GradientCanvas = () => {
  useEffect(() => {
    new Gradient().initGradient("#gradient-canvas");
  }, []);

  return (
    <div></div>
  )

  return (
    <div className="h-[5vh]">
      <div className="-skew-y-12 absolute overflow-hidden left-0 top-[-66vh] z-[-1]">
        <canvas id="gradient-canvas" className="w-[100vw] h-[100vh]" />
      </div>
    </div>
  );
};

export default GradientCanvas;
