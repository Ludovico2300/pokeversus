import React from "react";
import { Move } from "../types/pokemon";

type MoveCardProps = {
  move: Move;
};

export default function MoveCard(props: MoveCardProps) {
  const { move } = props;

  return (
    <div className="m-1 flex items-center justify-center border w-[50%] rounded text-black bg-white hover:bg-[#FD0001] cursor-pointer">
      <div>{move.move.name}</div>
    </div>
  );
}
