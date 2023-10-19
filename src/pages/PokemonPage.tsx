import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePokeApi from "../hooks/usePokeApi";
import pokeballspinning from "../assets/img/pokeballspinning.gif";
import { Pokemon } from "../types/pokemon";

export default function PokemonPage() {
  const { id } = useParams();
  const { fetchData, loading } = usePokeApi();
  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(() => {
    if (id && !loading) {
      fetchData(id)
        .then((data) => {
          setPokemon(data);
        })
        .catch((error) => {
          console.error("Error fetching Pokémon data:", error);
        });
    }
  }, [id]);

  return (
    <div className="w-[90%] h-[90%] bg-black text-white border-white border-4 rounded-3xl transition-colors duration-300 ease-in-out rounded py-2 px-4 flex flex-col flex-wrap items-center justify-start">
      {pokemon && (
        <>
          <div className="text-center">
            <img
              src={loading ? pokeballspinning : pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-32 h-32 rounded-full mx-auto"
            />
            <h2 className="text-lg font-bold uppercase">{pokemon.name}</h2>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Base Stats</h3>
            <ul>
              {pokemon.stats.map((stat) => (
                <li key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Abilities</h3>
            <ul>
              {pokemon.abilities.map((ability) => (
                <li key={ability.ability.name}>{ability.ability.name}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Types</h3>
            <ul>
              {pokemon.types.map((type) => (
                <li key={type.type.name}>{type.type.name}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Moves</h3>
            <ul>
              {pokemon.moves.map((move) => (
                <li key={move.move.name}>{move.move.name}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
