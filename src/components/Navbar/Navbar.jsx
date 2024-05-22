import "./Navbar.css";
import { NavLink } from "react-router-dom";
function Navbar() {
  return (
    <header>
      <NavLink to="/">Home</NavLink>

      <ul>
        <li>
          <NavLink to="/userForm">Form</NavLink>
        </li>
        <li>
          <NavLink to="/textEditor">Editor</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Navbar;
