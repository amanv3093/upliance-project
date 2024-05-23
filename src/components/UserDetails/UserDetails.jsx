import "./UserDetails.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
function UserDetails() {
  const userDetails = useSelector((state) => state.UserData.user);
  return (
    <div className="UserDetails">
      <NavLink to="/textEditor" className="UserDetails-anchor">
        <div className="UserDetails-inner">
          <h1>User Details</h1>
          <h4>Name: {userDetails.name}</h4>
          <h4>Email: {userDetails.email}</h4>
          <h4>User-id: {userDetails.id}</h4>
        </div>
      </NavLink>
    </div>
  );
}

export default UserDetails;
