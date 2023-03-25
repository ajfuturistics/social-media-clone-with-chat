import React from "react";
import { BiHome, BiCog, BiBell, BiConversation } from "react-icons/bi";

const NavIcons = () => {
  return (
    <div className="navIcons mt-4 flex justify-between">
      <BiHome size={30} />
      <BiCog size={30} />
      <BiBell size={30} />
      <BiConversation size={30} />
    </div>
  );
};

export default NavIcons;
