import { nanoid } from "nanoid";
import { Button, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setUser, saveUser, loadUser } from "../../Redux/Slices/UserSlice";
import { useEffect } from "react";
import "./UserDataForm.css";
function UserDataForm() {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.UserData.user);
  useEffect(() => {
    dispatch(loadUser());

    const handleBeforeUnload = (e) => {
      if (userDetails.unsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [dispatch, userDetails.unsavedChanges]);

  const handleChange = (e) => {
    console.log("run");
    const { name, value } = e.target;
    dispatch(setUser({ ...userDetails, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userId = userDetails.id || nanoid();
    dispatch(saveUser({ ...userDetails, id: userId }));
  };
  console.log(userDetails);
  return (
    <form onSubmit={handleFormSubmit} className="userDataForm">
      <div className="userForm">
        <div className="user-text">
          <span>User</span>
          <span style={{ color: "#e2173b" }}>Information</span>
          <span>Collection</span>
          <span>Form!</span>{" "}
        </div>
        <div className="formInner">
          <div className="AllInputBox">
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
