import { useReducer, useState } from "react";
import "./LoginLogout.css";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "../../firebase/Firebase";
import { useDispatch } from "react-redux";
import { handelLoginSuccessful } from "../../Redux/Slices/CounterSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUser } from "../../Redux/Slices/UserSlice";

let SignUpFun = (state, action) => {
  if (action.type === "name") {
    return { ...state, name: action.payload };
  } else if (action.type === "email") {
    return { ...state, email: action.payload };
  } else if (action.type === "password") {
    return { ...state, password: action.payload };
  } else {
    return state;
  }
};

let loginFun = (state, action) => {
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

  let [signUpDetails, signUpDispatch] = useReducer(SignUpFun, {
    name: "",
    email: "",
    password: "",
  });
  let [loginDetails, loginDispatch] = useReducer(loginFun, {
    email: "",
    password: "",
  });
  const auth = getAuth(app);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(loginDetails);
  console.log(signUpDetails);

  /****************  createUserWithEmailAndPassword *******************/
  async function signUpFun(e) {
    e.preventDefault();
    let displayName = signUpDetails.name;
    let signUpEmail = signUpDetails.email;
    let signUpPassword = signUpDetails.password;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signUpEmail,
        signUpPassword
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: displayName });

      let result = await signInWithEmailAndPassword(
        auth,
        signUpEmail,
        signUpPassword
      );

      console.log(result);
      const detail = result.user.providerData[0];
      dispatch(setUser({ name: detail.displayName, email: detail.email }));
      dispatch(handelLoginSuccessful(true));

      toastFun("Sign-up completed successfully.");

      setTimeout(() => {
        navigate("/userForm");
      }, 2000);
    } catch (error) {
      // Show error toast
      toastFun(error.message);
    }
  }

  /***************************      End      **********************************/

  /****************  LoginWithEmailAndPassword *******************/
  async function LoginFun(e) {
    e.preventDefault();
    let email = loginDetails.email;
    let password = loginDetails.password;

    try {
      let res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
      dispatch(handelLoginSuccessful(true));
      toastFun("You have successfully logged in.");
      setTimeout(() => {
        navigate("/userForm");
      }, 2000);
    } catch (error) {
      toastFun(error.message);
    }
  }
  /***************************      End      **********************************/

  /***************************      toastify-Function       **********************************/
  function toastFun(message) {
    toast(message, {
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
                value={loginDetails.email}
              />
              <input
                type="password"
                placeholder="Enter the Password"
                onChange={(e) =>
                  loginDispatch({ type: "password", payload: e.target.value })
                }
                value={loginDetails.password}
              />
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter your Name"
                onChange={(e) =>
                  signUpDispatch({ type: "name", payload: e.target.value })
                }
                value={signUpDetails.name}
              />
              <input
                type="email"
                placeholder="Enter the Email"
                onChange={(e) =>
                  signUpDispatch({ type: "email", payload: e.target.value })
                }
                value={signUpDetails.email}
              />
              <input
                type="password"
                placeholder="Enter the Password"
                onChange={(e) =>
                  signUpDispatch({ type: "password", payload: e.target.value })
                }
                value={signUpDetails.password}
              />
            </>
          )}
        </div>
        <div className="LoginLogout-buttonBox">
          {loginOpen ? (
            <button type="submit">Login</button>
          ) : (
            <button type="submit">Sign Up</button>
          )}
        </div>
        <p className="checkAccount">
          {loginOpen ? "Create a new account " : "Already have an account? "}
          <span
            className="innerCheckAccount"
            onClick={() => setLoginOpen(!loginOpen)}
          >
            {loginOpen ? "Click" : "Login here"}
          </span>
        </p>
      </form>
      <div></div>
    </div>
  );
}

export default LoginLogout;
