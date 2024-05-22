import { useState } from "react";
import "./LoginLogout.css";
function LoginLogout() {
  let [loginOpen, setLoginOpen] = useState(true);
  return (
    <div className="LoginLogout-box">
      <form className="LoginLogout-form">
        <div className="LoginLogout-text">
          <h1>{loginOpen ? "Login" : "Sign Up"}</h1>
        </div>
        <div className="LoginLogout-input">
          {loginOpen ? (
            <>
              <input type="text" placeholder="Enter the Email" />
              <input type="password" placeholder="Enter the Password" />
            </>
          ) : (
            <>
              <input type="text" placeholder="Enter the Name" />
              <input type="text" placeholder="Enter the Email" />
              <input type="password" placeholder="Enter the Password" />
            </>
          )}
        </div>
        <div className="LoginLogout-buttonBox">
          <button className="LoginLogout-button">Sign in</button>
        </div>
        <p>
          Create a new account{" "}
          <span onClick={() => setLoginOpen(!loginOpen)}>Click</span>
        </p>
      </form>
      <div></div>
    </div>
  );
}

export default LoginLogout;
