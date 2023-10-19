import React, { useEffect, useState } from "react";
import usePokeApi from "../hooks/usePokeApi";
import pokeballspinning from "../assets/img/pokeballspinning.gif";
import { Pokemon } from "../type.def";

type PokemonCardPokedexProps = {
  pokemonName: string;
  showBst: boolean;
  onClick?: () => void;
  loading?: boolean;
  customStyle?: string;
};

export default function PokemonCardPokedex(props: PokemonCardPokedexProps) {
  const { pokemonName, showBst, onClick, loading, customStyle } = props;
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);

  const { fetchData } = usePokeApi();

  useEffect(() => {
    if (!pokemonData && !loading) {
      fetchData(pokemonName)
        .then((data) => {
          setPokemonData(data);
        })
        .catch((error) => {
          console.error("Error fetching Pokémon data:", error);
        });
    }
  }, [pokemonName, pokemonData, loading, fetchData]);

  return (
    <button
      className={`bg-black hover:bg-[#FD0001] text-white border-4 font-bold py-2 px-4 rounded flex flex-col justify-center items-center ${
        customStyle ? customStyle : ""
      }`}
      onClick={() => (onClick ? onClick() : console.log("onClick"))}
    >
      {pokemonData && (
        <>
          <img
            src={loading ? pokeballspinning : pokemonData.sprites.front_default}
            height={100}
            width={100}
            className="rounded"
            alt={pokemonName}
          />
          <div>#{pokemonData.id}</div>
          <div className="text-xs">{pokemonName.toUpperCase()}</div>
          <div>
            {showBst
              ? `BST: ${pokemonData.stats.reduce(
                  (acc, stat) => acc + stat.base_stat,
                  0
                )}`
              : "***"}
          </div>
        </>
      )}
    </button>
  );
}
