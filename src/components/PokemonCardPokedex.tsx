import React, { useEffect, useState } from "react";
import usePokeApi from "../hooks/usePokeApi";
import pokeballspinning from "../assets/img/pokeballspinning.gif";
/* import { Pokemon } from "../type.def"; */
import { Link } from "react-router-dom";
import { Pokemon } from "../types/pokemon";

type PokemonCardPokeDexProps = {
  pokemonName: string;
  showBst: boolean;
  loading?: boolean;
  customStyle?: string;
};

export default function PokemonCardPokeDex(props: PokemonCardPokeDexProps) {
  const { pokemonName, showBst, loading, customStyle } = props;
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
    <Link
      to={"/pokedex/" + pokemonData?.id}
      className={`bg-black hover:bg-[#FD0001] transition-colors duration-300 ease-in-out text-white border-4 font-bold py-2 px-4 rounded flex flex-col justify-center items-center ${
        customStyle ? customStyle : ""
      }`}
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
    </Link>
  );
}
