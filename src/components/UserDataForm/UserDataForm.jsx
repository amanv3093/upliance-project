import React from "react";
import { nanoid } from "nanoid";
import { Button, TextField } from "@mui/material";
function UserDataForm() {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // localStorage.setItem('userData', JSON.stringify(userData));
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <TextField label="Name" name="name" fullWidth margin="normal" />
      <div>
        <TextField label="Address" name="Address" fullWidth margin="normal" />
      </div>
      <div>
        <TextField label="Email" name="Email" fullWidth margin="normal" />
      </div>
      <div>
        <TextField label="Phone no" name="Phone no" fullWidth margin="normal" />
      </div>

      <Button type="submit" variant="contained" color="primary">
        Save User Data
      </Button>
    </form>
  );
}

export default UserDataForm;
