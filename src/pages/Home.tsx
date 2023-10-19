import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//this component will be PokeVerus
export default function Home() {
  return (
    <>
      <div className="bg-black text-white text-xl h-[10%] w-[30%] border-white border-4 rounded-xl flex flex-col items-center justify-center font-bold">
        Welcome to PokeVersus!
      </div>
      <Link
        to="/pokeversus"
        className="bg-white hover:bg-[#FD0001] transition-colors duration-300 ease-in-out text-xl h-[10%] w-[30%] border-black border-4 rounded-xl flex items-center justify-center font-bold"
      >
        PokeVersus
      </Link>
      <Link
        to="/pokedex"
        className="bg-white hover:bg-[#FD0001] transition-colors duration-300 ease-in-out text-xl h-[10%] w-[30%] border-black border-4 rounded-xl flex items-center justify-center font-bold"
      >
        PokeDex
      </Link>
      <Link
        to="/dashboard"
        className="bg-white hover:bg-[#FD0001] transition-colors duration-300 ease-in-out text-xl h-[10%] w-[30%] border-black border-4 rounded-xl flex items-center justify-center font-bold"
      >
        DashBoard
      </Link>
    </>
  );
}
