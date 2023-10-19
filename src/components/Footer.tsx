import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-[#FD0001] h-[10vh] w-full flex justify-around items-center font-bold fixed bottom-0 left-0 overflow-hidden">
      <Link
        to="/about"
        className="p-2 text-black hover:text-white transition-colors duration-300 ease-in-out cursor-pointer font-bold"
      >
        About
      </Link>

      <Link
        to="/connect"
        className="p-2 text-black hover:text-white transition-colors duration-300 ease-in-out cursor-pointer font-bold"
      >
        Connect
      </Link>
    </div>
  );
}
