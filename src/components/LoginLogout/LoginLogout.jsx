import { useReducer, useState } from "react";
import "./LoginLogout.css";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "../../firebase/Firebase";
import { useDispatch } from "react-redux";
import { handelLoginSuccessful } from "../../Redux/Slices/CounterSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let SignUpFun = (state, action) => {
  if (action.type === "email") {
    return { ...state, email: action.payload };
  } else if (action.type === "password") {
    return { ...state, password: action.payload };
  } else {
    return state;
  }
};

let loginFun = (state, action) => {
  console.log(action.type);
  if (action.type === "email") {
    return { ...state, email: action.payload };
  } else if (action.type === "password") {
    return { ...state, password: action.payload };
  } else {
    return state;
  }
};

function LoginLogout() {
  let [loginOpen, setLoginOpen] = useState(true);
  let [signUpDetails, signUpDispatch] = useReducer(SignUpFun, null);
  let [loginDetails, loginDispatch] = useReducer(loginFun, null);
  const auth = getAuth(app);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  /****************  createUserWithEmailAndPassword *******************/
  console.log(signUpDetails);
  async function signUpFun(e) {
    e.preventDefault();
    let signUpEmail = signUpDetails.email;
    let signUpPassword = signUpDetails.password;
    try {
      await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
      await signInWithEmailAndPassword(auth, signUpEmail, signUpPassword);
      dispatch(handelLoginSuccessful(true));

      toastFun("Sign-up completed successfully.");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toastFun(error);
    }
  }
  /***************************      End      **********************************/

  /****************  LoginWithEmailAndPassword *******************/
  async function LoginFun(e) {
    e.preventDefault();
    let email = loginDetails.email;
    let password = loginDetails.password;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(handelLoginSuccessful(true));
      toastFun("You have successfully Login.");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toastFun(error);
    }
  }
  /***************************      End      **********************************/

  /***************************      toastify-Function       **********************************/
  function toastFun(e) {
    toast(e, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  /***************************      End      **********************************/
  return (
    <div className="LoginLogout-box">
      <ToastContainer />
      <form
        className="LoginLogout-form"
        onSubmit={loginOpen ? LoginFun : signUpFun}
      >
        <div className="LoginLogout-text">
          <h1>{loginOpen ? "Login" : "Sign Up"}</h1>
        </div>
        <div className="LoginLogout-input">
          {loginOpen ? (
            <>
              <input
                type="email"
                placeholder="Enter the Email"
                onChange={(e) =>
                  loginDispatch({ type: "email", payload: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Enter the Password"
                onChange={(e) =>
                  loginDispatch({ type: "password", payload: e.target.value })
                }
              />
            </>
          ) : (
            <>
              <input
                type="email"
                placeholder="Enter the Email"
                onChange={(e) =>
                  signUpDispatch({ type: "email", payload: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Enter the Password"
                onChange={(e) =>
                  signUpDispatch({ type: "password", payload: e.target.value })
                }
              />
            </>
          )}
        </div>
        <div className="LoginLogout-buttonBox">
          {loginOpen ? (
            <button type="submit">Login</button>
          ) : (
            <button type="submit">SignUp</button>
          )}
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
