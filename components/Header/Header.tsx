import React from "react";
import MenuIcon from "@/assets/icons/menu.svg";
import SearchIcon from "@/assets/icons/search.svg";

const Header = () => {
  return (
    <div className="flex justify-between items-center mb-11">
      <MenuIcon />

      <span className="font-bold text-xl">Quran App</span>

      <SearchIcon />
    </div>
  );
};

export default Header;
