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
};

export default function PokemonCard(props: PokemonCardProps) {
  const { pokemonSprite, pokemonName, pokemonBST, onClick, showBst, loading } =
    props;
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
      className={`bg-black hover:bg-[#FD0001] text-white border-4 font-bold py-2 px-4 rounded flex flex-col justify-center items-center ${
        loading ? "animate-pulse" : ""
      }`}
      onClick={() => (onClick ? onClick() : console.log("onClick"))}
    >
      <img
        src={loading ? pokeballspinning : pokemonSprite}
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
