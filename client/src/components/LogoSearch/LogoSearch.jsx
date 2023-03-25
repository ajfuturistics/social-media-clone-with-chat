import React from "react";
// import Logo from "../../img/logo.png";
import { AiOutlineCrown } from "react-icons/ai";
import { MdSearch } from "react-icons/md";

const LogoSearch = () => {
  return (
    <div className="LogoSearch flex gap-3 p-1">
      {/* <img src={Logo} alt="Logo" /> */}
      <AiOutlineCrown size={36} className="text-rose-500" />
      <div className="search flex bg-[#28343e11] rounded-[10px] p-[5px]">
        <input
          type="text"
          placeholder="#Explore"
          className="bg-transparent border-none outline-none"
        />
        <div className="s-icon flex justify-center items-center bg-rose-500 rounded p-[4px] text-slate-200 hover:cursor-pointer">
          <MdSearch size={28} />
        </div>
      </div>
    </div>
  );
};

export default LogoSearch;
