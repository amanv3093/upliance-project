import { nanoid } from "nanoid";
import { Button, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setUser, saveUser, loadUser } from "../../Redux/Slices/UserSlice";
import { useEffect } from "react";
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
    <form onSubmit={handleFormSubmit}>
      <TextField
        label="Name"
        name="name"
        fullWidth
        margin="normal"
        value={userDetails.name}
        onChange={handleChange}
      />
      <div>
        <TextField
          label="Address"
          name="address"
          fullWidth
          margin="normal"
          value={userDetails.address}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          value={userDetails.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          label="Phone no"
          name="phone"
          fullWidth
          margin="normal"
          value={userDetails.phone}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" variant="contained" color="primary">
        Save User Data
      </Button>
    </form>
  );
}

export default UserDataForm;
