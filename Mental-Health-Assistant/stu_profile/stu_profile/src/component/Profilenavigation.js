import React, { useState } from "react";
import { useCookies } from "react-cookie";

function ProfileNavigationItem() {

  const [email, setMMemail] = useCookies(["MMemail"]);

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handleNavigationClick = () => {
      setIsDropdownVisible(!isDropdownVisible);
    };
  
    const handleSignOutClick = () => {
      // perform sign out functionality
    };

  
  
    return (
      <li className="nav-item me-3 me-lg-1">
        <a className="nav-link d-sm-flex align-items-sm-center" onClick={handleNavigationClick}>
  
          <strong className="d-none d-sm-block ms-1">{email.MMemail}</strong>
        </a>
        {isDropdownVisible && (
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={handleSignOutClick}>Sign out</button>
            <button className="dropdown-item">Profile</button>
          </div>
        )}
      </li>
    );
}

export default ProfileNavigationItem;