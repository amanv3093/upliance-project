import navLogo from "../../assets/7152b079-f35b-4d25-ac2b-2cec99340c13.png";
import { NavLink, useNavigate } from "react-router-dom";
import "./LoginLogout.css";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { handelLoginSuccessful } from "../../Redux/Slices/CounterSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Logout() {
  const auth = getAuth();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  /**************** SignOut ********** */
  async function SignOut() {
    try {
      await signOut(auth);
      dispatch(handelLoginSuccessful(false));
      toastFun("You have successfully SignOut out.");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      toastFun(err);
    }
  }
  /**************** End ****************/

  /**************** toastFun ********** */
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
  /**************** End ****************/
  return (
    <div className="logout">
      <div className="logout-box">
        <ToastContainer />
        <NavLink to="/">
          <img src={navLogo} className="nav-logo" alt="Navigation Logo" />
        </NavLink>
        <div className="logout-box">
          <h2>See you soon!</h2>
          <p>
            You are about to logout.
            <br />
            Are you sure this is what <br />
            you want?
          </p>
          <div className="logout-btn">
            <NavLink to="/">
              <button className="logout-btn1">Cancel</button>
            </NavLink>
            <button className="logout-btn2" onClick={SignOut}>
              Confirm Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;
