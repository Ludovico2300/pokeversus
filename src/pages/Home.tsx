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
        to="/dashboard"
        className="bg-black text-white text-xl h-[10%] w-[30%] border-white border-4 rounded-xl flex flex-col items-center justify-center font-bold"
      >
        DashBoard
      </Link>
      <Link
        to="/pokeversus"
        className="bg-black text-white text-xl h-[10%] w-[30%] border-white border-4 rounded-xl flex flex-col items-center justify-center font-bold"
      >
        Play
      </Link>
      <Link
        to="/pokedex"
        className="bg-black text-white text-xl h-[10%] w-[30%] border-white border-4 rounded-xl flex flex-col items-center justify-center font-bold"
      >
        PokèDex
      </Link>
    </>
  );
}
