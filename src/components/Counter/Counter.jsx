import "./Counter.css";
import { UseCustomContext } from "../../Context/Context";
import HoverButtons from "./HoverButtons";

const Counter = () => {
  const { count } = UseCustomContext();

  const handelBackgroundColor = (count) => {
    const startColor = [255, 255, 255];
    const endColor = [128, 128, 128];
    const t = (count % 100) / 100;
    const color = startColor.map((start, index) => {
      const end = endColor[index];
      return Math.round(start + (end - start) * t);
    });

    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  };

  const backgroundColor = handelBackgroundColor(count);

  return (
    <div className="counter" style={{ backgroundColor }}>
      <h1 style={{ paddingBottom: "2rem" }}>{count}</h1>
      <HoverButtons />
    </div>
  );
};

export default Counter;
