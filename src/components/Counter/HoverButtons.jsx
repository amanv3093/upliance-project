import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./HoverButtons.css"; // Create this CSS file for the styles
import { useSelector, useDispatch } from "react-redux";
import {
  incrementCount,
  decrementCount,
  resetCount,
} from "../../Redux/Slices/CounterSlice";
const HoverButton = ({ children, color }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    let hover = false;
    let x = 0,
      y = 0,
      width = 0,
      height = 0;

    const calculatePosition = () => {
      gsap.set(button, { x: 0, y: 0, scale: 1 });
      const box = button.getBoundingClientRect();
      x = box.left + box.width * 0.5;
      y = box.top + box.height * 0.5;
      width = box.width;
      height = box.height;
    };

    const onMouseMove = (e) => {
      let hoverArea = hover ? 0.7 : 0.5;
      let dx = e.clientX - x;
      let dy = e.clientY - y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < width * hoverArea) {
        if (!hover) {
          hover = true;
        }
        onHover(e.clientX, e.clientY);
      } else if (hover) {
        onLeave();
        hover = false;
      }
    };

    const onHover = (mouseX, mouseY) => {
      gsap.to(button, {
        x: (mouseX - x) * 0.4,
        y: (mouseY - y) * 0.4,
        scale: 1.15,
        ease: "power2.out",
        duration: 0.4,
      });
      button.style.zIndex = 10;
    };

    const onLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        scale: 1,
        ease: "elastic.out(1.2, 0.4)",
        duration: 0.7,
      });
      button.style.zIndex = 1;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", calculatePosition);
    calculatePosition();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", calculatePosition);
    };
  }, []);

  return (
    <button ref={buttonRef} style={{ background: color }}>
      {children}
    </button>
  );
};

const HoverButtons = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.count);
  console.log(count);

  return (
    <div className="button-container">
      <ul>
        <li onClick={() => dispatch(decrementCount())}>
          <HoverButton color="#FF1654">
            <span className="material-symbols-outlined">remove</span>
          </HoverButton>
        </li>
        <li onClick={() => dispatch(resetCount(1))}>
          <HoverButton color="#247BA0">
            <span className="material-symbols-outlined">refresh</span>
          </HoverButton>
        </li>
        <li onClick={() => dispatch(incrementCount())}>
          <HoverButton color="#FF1654">
            <span className="material-symbols-outlined">add</span>
          </HoverButton>
        </li>
      </ul>
    </div>
  );
};

export default HoverButtons;
