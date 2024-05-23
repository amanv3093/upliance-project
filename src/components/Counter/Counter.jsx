import "./Counter.css";
import "../../App.css";
import HoverButtons from "./HoverButtons";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ProfileViewsChart from "../ProfileViewsChart/ProfileViewsChart";
import UserDetails from "../UserDetails/UserDetails";
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
      <div className="counter-box1">
        <div className="counter-box1-inner">
          <h1 style={{ paddingBottom: "2rem" }}>{count}</h1>
          <HoverButtons />
        </div>
        <UserDetails />
      </div>
      <div style={{ paddingTop: "5rem" }}>
        <ProfileViewsChart />
      </div>
    </div>
  );
};

export default Counter;
