import React from "react";

type TechLogoProps = {
  sourceTech: string;
  nameTech: string;
};

export default function TechLogo(props: TechLogoProps) {
  const { sourceTech, nameTech } = props;
  return (
    <div
      className={`bg-white hover:bg-[#FD0001] transition-colors duration-300 ease-in-out border-black border-4 font-bold py-2 px-4 rounded-3xl flex flex-col justify-center items-center h-[15vh] w-[10vw]`}
    >
      <img
        src={sourceTech}
        height={50}
        width={50}
        className="rounded"
        alt={sourceTech}
      />
      <div>{nameTech}</div>
    </div>
  );
}
