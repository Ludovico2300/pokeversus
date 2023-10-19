import githubLogo from "../assets/img/stacklogos/github.png";
import linkedinLogo from "../assets/img/stacklogos/LinkedIn_icon.svg.png";

export default function Connect() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-around">
      <div className="bg-black text-white text-xl h-[10vh] w-[30vw] border-white border-4 rounded-xl flex flex-col items-center justify-center font-bold">
        Connect
      </div>
      <a
        href="https://www.linkedin.com/in/ludovico-colucci-266546193/"
        className="bg-white hover:bg-[#FD0001] transition-colors duration-300 ease-in-out text-xl h-[10vh] w-[30vw] border-black border-4 rounded-xl flex items-center justify-center font-bold"
      >
        <img
          src={linkedinLogo}
          className="mr-2"
          width={30}
          height={30}
          alt={linkedinLogo}
        />
        LinkedIn
      </a>
      <a
        href="https://github.com/Ludovico2300"
        className="bg-white hover:bg-[#FD0001] transition-colors duration-300 ease-in-out text-xl h-[10vh] w-[30vw] border-black border-4 rounded-xl flex items-center justify-center font-bold my-3"
      >
        <img
          src={githubLogo}
          className="mr-2"
          width={30}
          height={30}
          alt={githubLogo}
        />
        GitHub
      </a>
      <div className="bg-white hover:bg-[#FD0001] transition-colors duration-300 ease-in-out text-xl h-[10vh] w-[30vw] border-black border-4 rounded-xl flex items-center justify-center font-bold">
        Contact me: colucciludovico@gmail.com
      </div>
    </div>
  );
}
