import React from "react";
import { BiHome, BiCog, BiBell, BiConversation } from "react-icons/bi";
import { Link } from "react-router-dom";

const NavIcons = () => {
  return (
    <div className="navIcons mt-4 flex justify-between">
      <Link to="/home">
        <BiHome size={30} />
      </Link>
      <BiCog size={30} />
      <BiBell size={30} />
      <BiConversation size={30} />
    </div>
  );
};

export default NavIcons;
