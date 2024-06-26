import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setUser,
  saveUser,
  loadUser,
  setUserContent,
} from "../../Redux/Slices/UserSlice";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import "./UserDataForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserDataForm() {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.UserData.user);
  const [checkSave, setCheckSave] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(loadUser());

    const handleBeforeUnload = (e) => {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [dispatch, unsavedChanges]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setUser({ ...userDetails, [name]: value }));
    setUnsavedChanges(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const userId = userDetails.id || nanoid();
    const combinedContent = `
     
      <p><strong>Address:</strong> ${userDetails.address}</p>
      <p><strong>Email:</strong> ${userDetails.email}</p>
      <p><strong>Phone:</strong> ${userDetails.phone}</p>
      <p><strong>User ID:</strong> ${userId}</p>
    `;
    dispatch(setUserContent({ content: combinedContent }));
    dispatch(
      saveUser({ ...userDetails, id: userId, content: combinedContent })
    );
    setUnsavedChanges(false);
    toastFun("Save Data successfully.");
    setTimeout(() => {
      setCheckSave(true);
    }, 2000);
  };

  const handleFormSubmit2 = (e) => {
    e.preventDefault();
    toastFun("Save Data successfully.");
    setTimeout(() => {
      navigate("/textEditor");
    }, 2000);
  };

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

  return (
    <form
      onSubmit={checkSave ? handleFormSubmit2 : handleFormSubmit}
      className="userDataForm"
    >
      <ToastContainer />
      <div className="userForm">
        <div className="user-text">
          <span>User</span>
          <span style={{ color: "#e2173b" }}>Information</span>
          <span>Collection</span>
          <span>Form!</span>
        </div>
        <div className="formInner">
          <div className="AllInputBox">
            {!checkSave ? (
              <>
                <input
                  name="address"
                  type="text"
                  value={userDetails.address}
                  onChange={handleChange}
                  placeholder="Your Address"
                  required
                />
                <input
                  name="email"
                  type="email"
                  value={userDetails.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                />
                <input
                  name="phone"
                  type="number"
                  value={userDetails.phone}
                  onChange={handleChange}
                  placeholder="Your PhoneNo"
                  required
                />
              </>
            ) : (
              <>
                <input
                  name="name"
                  type="text"
                  value={userDetails.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
                <input
                  name="id"
                  type="text"
                  readOnly
                  value={userDetails.id}
                  placeholder="User ID"
                  required
                />
              </>
            )}
          </div>
          <button className="User-btn" type="submit">
            Save User Data
          </button>
        </div>
      </div>
    </form>
  );
}

export default UserDataForm;
