import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePokeApi from "../hooks/usePokeApi";
import pokeballspinning from "../assets/img/pokeballspinning.gif";
import { Pokemon } from "../types/pokemon";
import { PokemonFull } from "../types/pokemonSpecies";
import TypeIcon from "../components/TypeIcon";
import pokeballImage from "../assets/img/pokemon/pokeball.png";
import shinySymbolPokemon from "../assets/img/pokemon/shiny_symbol_pokemon.png";

export default function PokemonPage() {
  const { id } = useParams();
  const { fetchData, loading, fetchPokemonDetail } = usePokeApi();
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [pokemonDetails, setPokemonDetails] = useState<PokemonFull>();

  const [entryNum, setEntryNum] = useState<number>(0);
  const [isShiny, setIsShiny] = useState<boolean>(false);

  useEffect(() => {
    if (id && !loading) {
      fetchData(id)
        .then((data) => {
          setPokemon(data);
        })
        .catch((error) => {
          console.error("Error fetching Pokémon data:", error);
        });

      fetchPokemonDetail(id)
        .then((data) => {
          setPokemonDetails(data);
        })
        .catch((error) => {
          console.error("Error fetching Pokémon Details data:", error);
        });
    }
  }, [id]);

  return (
    <div className="w-[50%] h-[99%] bg-black text-white border-white border-4 rounded-3xl transition-colors duration-300 ease-in-out rounded py-2 px-4 flex flex-col items-center justify-start absolute top-1">
      {pokemon && (
        <div className="flex-1 flex-col items-center w-full h-[100%] text-center justify-between">
          <div className="flex items-center justify-start h-[50%] justify-between p-4 border rounded-lg w-full">
            <div className="flex flex-col items-center justify-around h-[99%] w-[25%]">
              <img
                src={pokeballImage}
                alt={"pokeballImage"}
                height={50}
                width={50}
                className="rounded-full mx-auto cursor-pointer"
              />
              <img
                src={shinySymbolPokemon}
                alt={"shinySymbolPokemon"}
                height={50}
                width={50}
                className="rounded-full mx-auto cursor-pointer"
                onClick={() => setIsShiny(!isShiny)}
              />
            </div>
            <div className="flex-3 flex-col">
              {/* SPRITE */}
              <img
                src={
                  loading
                    ? pokeballspinning
                    : isShiny
                    ? pokemon?.sprites.front_shiny
                    : pokemon?.sprites.front_default
                }
                alt={pokemon.name}
                height={200}
                width={200}
                className="rounded-full mx-auto"
              />

              {/* NAME - TYPES */}
              <h2 className="text-lg font-bold uppercase">{pokemon.name}</h2>
              <div className="flex w-full justify-center">
                {pokemon.types.map((type) => (
                  <TypeIcon key={type.type.name} typeName={type.type.name} />
                ))}
              </div>
            </div>

            {/* STATS */}
            <div className="flex flex-col mt-4 w-[30%] h-[100%] justify-between">
              {pokemon.stats.map((stat) => (
                <div
                  className="flex justify-between items-center py-1"
                  key={stat.stat.name}
                >
                  <p className="text-sm font-semibold">{stat.stat.name}:</p>
                  <p>{stat.base_stat}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ABILITIES */}
          <div className="mt-4 flex flex-col items-center w-full p-4 border rounded-lg">
            <h3 className="text-lg font-semibold flex w-full justify-around">
              Abilities
            </h3>
            <div className="flex w-full justify-around">
              {pokemon.abilities.map((ability) => (
                <p
                  className="text-sm font-semibold uppercase"
                  key={ability.ability.name}
                >
                  {ability.ability.name}
                </p>
              ))}
            </div>
          </div>

          {/* DESCR */}
          <div className="mt-4 flex flex-col items-center h-[25%] w-full justify-between p-4 border rounded-lg">
            <h3 className="text-lg font-semibold">Descriptions</h3>
            <div className="flex justify-center item-center text-sm font-semibold w-full">
              {pokemonDetails?.flavor_text_entries[entryNum].flavor_text}
            </div>
            <div className="flex w-full justify-around">
              <button onClick={() => setEntryNum(entryNum - 1)}>PREV</button>
              <p>
                {pokemonDetails?.flavor_text_entries[
                  entryNum
                ].version.name.toUpperCase()}{" "}
                -{" "}
                {pokemonDetails?.flavor_text_entries[
                  entryNum
                ].language.name.toUpperCase()}
              </p>
              <button onClick={() => setEntryNum(entryNum + 1)}>NEXT</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
