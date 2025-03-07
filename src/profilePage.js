import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import iconHome from "./assets/home.png";
import iconBookings from "./assets/location.png";
import iconLocation from "./assets/house-door.png";
import iconProfile from "./assets/schedule.png";

function ProfilePage() {
  return (
    <div>
      <nav className="bottom-nav">
        <NavLink to="/home" className="nav-item">
          <img src={iconHome} alt="Home" />
        </NavLink>
        <NavLink to="/booking" className="nav-item">
          <img src={iconLocation} alt="Booking" />
        </NavLink>
        <NavLink to="/location" className="nav-item">
          <img src={iconBookings} alt="Location" />
        </NavLink>
        <NavLink to="/profile" className="nav-item">
          <img src={iconProfile} alt="Profile" />
        </NavLink>
      </nav>
    </div>
  );
}

export default ProfilePage;
