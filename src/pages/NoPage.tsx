import React from "react";
import { Link } from "react-router-dom";

export default function NoPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-around">
      <div className="bg-black text-white text-xl h-[10vh] w-[30vw] border-white border-4 rounded-xl flex flex-col items-center justify-center font-bold">
        NoPage
      </div>
      <Link
        to={"/"}
        className="bg-white hover:bg-[#FD0001] transition-colors duration-300 ease-in-out text-xl h-[10vh] w-[30vw] border-black border-4 rounded-xl flex flex-col items-center justify-center font-bold my-3"
      >
        <div>This page does not exist.</div>
        <div>Click here to navigate back to HomePage.</div>
      </Link>
    </div>
  );
}
