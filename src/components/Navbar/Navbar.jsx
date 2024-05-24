import { useSelector } from "react-redux";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import navLogo from "../../assets/7152b079-f35b-4d25-ac2b-2cec99340c13.png";
function Navbar() {
  let checkLogin = useSelector((state) => state.counter.LoginSuccessful);
  return (
    <header>
      <NavLink to="/">
        <img src={navLogo} className="nav-logo" />
      </NavLink>

      <ul>
        <li>
          <NavLink to="/userForm" className="top-h">
            Registration
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/textEditor">Editor</NavLink>
        </li> */}
        <li className="top-h">
          {!checkLogin ? (
            <NavLink to="/login">Login</NavLink>
          ) : (
            <div>
              <NavLink to="/logout">Logout</NavLink>
            </div>
          )}
        </li>
      </ul>
    </header>
  );
}

export default Navbar;
