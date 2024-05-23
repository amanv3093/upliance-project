import React from "react";
import "./UserDetails.css";
import { useSelector } from "react-redux";
function UserDetails() {
  const userDetails = useSelector((state) => state.UserData.user);
  return (
    <div className="UserDetails">
      <div className="UserDetails-inner">
        <h1>User Details</h1>
        <h4>Name: {userDetails.name}</h4>
        <h4>Email: {userDetails.email}</h4>
        <h4>User-id: {userDetails.id}</h4>
      </div>
    </div>
  );
}

export default UserDetails;
