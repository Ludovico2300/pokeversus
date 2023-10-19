import React from "react";
import TechLogo from "../components/TechLogo";
import cssLogo from "../assets/img/stacklogos/CSS3_logo_and_wordmark.svg.png";
import jsLogo from "../assets/img/stacklogos/Unofficial_JavaScript_logo_2.svg.png";
import htmlLogo from "../assets/img/stacklogos/HTML5_logo_and_wordmark.svg.png";
import tsLogo from "../assets/img/stacklogos/Typescript_logo_2020.svg.png";
import reactLogo from "../assets/img/stacklogos/React-icon.svg.png";
import twLogo from "../assets/img/stacklogos/png-transparent-tailwind-css-hd-logo-thumbnail.png";
import githubLogo from "../assets/img/stacklogos/github.png";

export default function About() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-around">
      <div className="bg-black text-white text-xl h-[10vh] w-[30vw] border-white border-4 rounded-xl flex flex-col items-center justify-center font-bold">
        About this project
      </div>
      <a
        href="https://github.com/Ludovico2300/pokeversus"
        className="bg-white hover:bg-[#FD0001] transition-colors duration-300 ease-in-out text-xl h-[10vh] w-[30vw] border-black border-4 rounded-xl flex items-center justify-center font-bold"
      >
        <img
          src={githubLogo}
          className="ml-2"
          width={30}
          height={30}
          alt={githubLogo}
        />
        Source Code
      </a>
      <div className="w-full flex flex-col items-center justify-between my-6">
        <div className="bg-white hover:bg-[#FD0001] transition-colors duration-300 ease-in-out text-xl h-[10vh] w-[30vw] border-black border-4 rounded-xl flex items-center justify-center font-bold my-3">
          Tech Stack
        </div>
        <div className="flex w-full items-center justify-around">
          <TechLogo nameTech="HTML5" sourceTech={htmlLogo} />
          <TechLogo nameTech="CSS3" sourceTech={cssLogo} />
          <TechLogo nameTech="JavaScript" sourceTech={jsLogo} />
          <TechLogo nameTech="TypeScript" sourceTech={tsLogo} />
          <TechLogo nameTech="React" sourceTech={reactLogo} />
          <TechLogo nameTech="Tailwind CSS" sourceTech={twLogo} />
        </div>
      </div>
    </div>
  );
}
