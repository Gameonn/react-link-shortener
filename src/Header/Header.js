import React from "react";
import { NavLink } from "react-router-dom";

const header = (props) => {
  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <NavLink to="/" className="brand-logo">
            ShortyLink
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default header;
