import { nanoid } from "nanoid";
import { Button, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setUser, saveUser, loadUser } from "../../Redux/Slices/UserSlice";
import { useEffect, useState } from "react";
import "./UserDataForm.css";
import { useNavigate } from "react-router-dom";
function UserDataForm() {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.UserData.user);
  const [checkSave, setCheckSave] = useState(false);
  const navigate = useNavigate();
  // useEffect(() => {
  //   dispatch(loadUser());

  //   const handleBeforeUnload = (e) => {
  //     if (userDetails.unsavedChanges) {
  //       e.preventDefault();
  //       e.returnValue = "";
  //     }
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [dispatch, userDetails.unsavedChanges]);

  const handleChange = (e) => {
    console.log("run");
    const { name, value } = e.target;
    dispatch(setUser({ ...userDetails, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userId = userDetails.id || nanoid();
    dispatch(saveUser({ ...userDetails, id: userId }));
    setTimeout(() => {
      setCheckSave(true);
    }, 2000);
  };
  const handleFormSubmit2 = (e) => {
    e.preventDefault();

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  console.log(userDetails);
  return (
    <form
      onSubmit={checkSave ? handleFormSubmit2 : handleFormSubmit}
      className="userDataForm"
    >
      <div className="userForm">
        <div className="user-text">
          <span>User</span>
          <span style={{ color: "#e2173b" }}>Information</span>
          <span>Collection</span>
          <span>Form!</span>{" "}
        </div>
        <div className="formInner">
          <div className="AllInputBox">
            {!checkSave ? (
              <>
                <input
                  label="Address"
                  name="address"
                  type="text"
                  value={userDetails.address}
                  onChange={handleChange}
                  placeholder="Your Address"
                  required
                />

                <input
                  label="Email"
                  name="email"
                  type="email"
                  value={userDetails.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                />

                <input
                  label="Phone no"
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
                  label="Name"
                  name="name"
                  type="text"
                  value={userDetails.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
                <input
                  label="Name"
                  name="Uid"
                  type="text"
                  readOnly
                  value={userDetails.id}
                  onChange={handleChange}
                  required
                />
              </>
            )}
          </div>
          <button className="User-btn" type="submit">
            {" "}
            Save User Data
          </button>
        </div>
      </div>
    </form>
  );
}

export default UserDataForm;
