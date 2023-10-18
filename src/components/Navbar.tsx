import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="h-12 w-full bg-black text-white flex justify-start items-center">
      <Link
        to="/"
        className="p-2 text-white hover:text-red-500 transition-colors duration-300 ease-in-out cursor-pointer font-bold"
      >
        Home
      </Link>
      <Link
        to="/pokedex"
        className="p-2 text-white hover:text-red-500 transition-colors duration-300 ease-in-out cursor-pointer font-bold"
      >
        Pokedex
      </Link>
    </div>
  );
}
