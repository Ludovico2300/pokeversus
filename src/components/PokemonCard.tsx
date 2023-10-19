import pokeballspinning from "../assets/img/pokeballspinning.gif";
import usePokeApi from "../hooks/usePokeApi";
import { useEffect, useState } from "react";

type PokemonCardProps = {
  pokemonSprite?: string;
  pokemonName: string;
  pokemonBST?: number;
  onClick?: () => void;
  showBst: boolean;
  loading?: boolean;
  isSelected?: boolean;
};

export default function PokemonCard(props: PokemonCardProps) {
  const {
    pokemonSprite,
    pokemonName,
    pokemonBST,
    onClick,
    showBst,
    loading,
    isSelected,
  } = props;
  const [sprites, setSprites] = useState();

  const { fetchData } = usePokeApi();
  useEffect(() => {
    if (!pokemonSprite) {
      fetchData(pokemonName).then((data) => {
        setSprites(data);
      });
    }
  }, []);

  return (
    <button
      className={`hover:bg-[#FD0001] transition-colors duration-300 ease-in-out text-white border-4 font-bold py-2 px-4 rounded-3xl flex flex-col justify-center items-center ${
        loading ? "animate-pulse" : ""
      } ${isSelected ? "bg-[#FD0001]" : "bg-black"}`}
      onClick={() => (onClick ? onClick() : console.log("onClick"))}
    >
      <img
        src={loading ? pokeballspinning : pokemonSprite ?? sprites}
        height={200}
        width={200}
        className="rounded"
        alt={pokemonSprite}
      />
      <div>{!loading ? pokemonName.toUpperCase() : "loading..."}</div>
      <div>{showBst ? pokemonBST : "***"}</div>
    </button>
  );
}
