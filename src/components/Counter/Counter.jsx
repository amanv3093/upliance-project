import "./Counter.css";
import "../../App.css";
import HoverButtons from "./HoverButtons";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const Counter = () => {
  let count = useSelector((state) => state.counter.count);

  const handleBackgroundColor = (count) => {
    const startColor = [255, 255, 255];
    const endColor = [128, 128, 0];
    const t = (count % 100) / 100;
    const color = startColor.map((start, index) => {
      const end = endColor[index];
      return Math.round(start + (end - start) * t);
    });

    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  };

  const backgroundColor = handleBackgroundColor(count);

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
  }, [backgroundColor]);
  return (
    <div className="counter">
      <h1 style={{ paddingBottom: "2rem" }}>{count}</h1>
      <HoverButtons />
    </div>
  );
};

export default Counter;
