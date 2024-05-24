import "./UserDetails.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function UserDetails() {
  const userDetails = useSelector((state) => state.UserData.user);

  return (
    <div className="UserDetails">
      <div className="UserDetails-inner">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1>User Details</h1>
          <NavLink
            style={{ color: "white" }}
            to="/textEditor"
            className="UserDetails-anchor"
          >
            <span className="material-symbols-outlined">edit</span>
          </NavLink>
        </div>

        <div
          className="hidden-details"
          dangerouslySetInnerHTML={{ __html: userDetails.content }}
        />
      </div>
    </div>
  );
}

export default UserDetails;
