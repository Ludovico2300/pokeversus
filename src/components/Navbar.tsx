import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="h-[10vh] w-full bg-black text-white flex justify-between items-center fixed left-0 top-0 overflow-hidden px-4">
      <div className="h-[100%] w-full flex justify-start items-center">
        <Link
          to="/"
          className="p-2 text-white hover:text-[#FD0001] transition-colors duration-300 ease-in-out cursor-pointer font-bold"
        >
          Home
        </Link>
        <Link
          to="/pokeversus"
          className="p-2 text-white hover:text-[#FD0001] transition-colors duration-300 ease-in-out cursor-pointer font-bold"
        >
          PokeVersus
        </Link>
        <Link
          to="/pokedex"
          className="p-2 text-white hover:text-[#FD0001] transition-colors duration-300 ease-in-out cursor-pointer font-bold"
        >
          PokeDex
        </Link>
      </div>
      <div className="h-[100%] w-full flex justify-end items-center">
        <Link
          to="/dashboard"
          className="p-2 text-white hover:text-[#FD0001] transition-colors duration-300 ease-in-out cursor-pointer font-bold"
        >
          DashBoard
        </Link>
      </div>
    </div>
  );
}
