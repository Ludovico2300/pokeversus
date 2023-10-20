import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePokeApi from "../hooks/usePokeApi";
import pokeballspinning from "../assets/img/pokeballspinning.gif";
import { Move, Pokemon } from "../types/pokemon";
import { PokemonFull } from "../types/pokemonSpecies";
import TypeIcon from "../components/TypeIcon";
import MoveCard from "../components/MoveCard";

export default function PokemonPage() {
  const { id } = useParams();
  const { fetchData, loading, fetchPokemonDetail } = usePokeApi();
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [pokemonDetails, setPokemonDetails] = useState<PokemonFull>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Move[]>([]);

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

  useEffect(() => {
    if (pokemon && searchTerm.length >= 3) {
      setSearchResults(
        pokemon.moves.filter((move) =>
          move.move.name.includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setSearchResults([]);
    }
  }, [pokemon, searchTerm]);

  return (
    <div className="w-[90%] h-[99%] bg-black text-white border-white border-4 rounded-3xl transition-colors duration-300 ease-in-out rounded py-2 px-4 flex flex-col items-center justify-start absolute top-1">
      <div className="w-full h-full flex items-center justify-around ">
        {pokemon && (
          <>
            {/* SPRITE - NAME - DESCR - ABT - TYPE*/}
            <div className="flex-1 flex-col items-center justify-start h-full ">
              <div className="text-center">
                {/* SPRITE */}
                <img
                  src={
                    loading ? pokeballspinning : pokemon.sprites.front_default
                  }
                  alt={pokemon.name}
                  height={200}
                  width={200}
                  className="rounded-full mx-auto"
                />
                {/* NAME */}
                <h2 className="text-lg font-bold uppercase">{pokemon.name}</h2>
              </div>
              {/* ABT -TYPES */}
              <div className="mt-4 flex flex-col items-center">
                {/* TYPES */}
                <div className="mt-4 flex flex-col items-center w-full">
                  <h3 className="text-lg font-semibold">Types</h3>
                  <div className="flex w-full justify-around">
                    {/* MAKE TYPE COMPONENT */}
                    {pokemon.types.map((type) => (
                      <TypeIcon
                        key={type.type.name}
                        typeName={type.type.name}
                      />
                    ))}
                  </div>
                </div>
                {/* ABILITIES */}
                <div className="mt-4 flex flex-col items-center w-full">
                  <h3 className="text-lg font-semibold flex w-full justify-around">
                    Abilities
                  </h3>
                  <div className="flex w-full justify-around">
                    {pokemon.abilities.map((ability) => (
                      <p key={ability.ability.name}>{ability.ability.name}</p>
                    ))}
                  </div>
                </div>
              </div>
              {/* DESCR */}
              <div className="mt-4 flex flex-col items-center">
                {/* MAKE POSSIBLE TO CHANGE ENTRY WITH A BUTTON */}
                <h3 className="text-lg font-semibold">Descriptions</h3>
                <div>{pokemonDetails?.flavor_text_entries[0].flavor_text}</div>
              </div>
            </div>
            {/* STATS - MOVES*/}
            <div className="flex-1 flex-col items-center justify-start h-full">
              {/* STATS */}
              <div className="mt-4 flex flex-col items-center  justify-around">
                <h3 className="text-lg font-semibold flex w-full justify-around">
                  Base Stats
                </h3>
                <div className="flex flex-col h-20 flex-wrap w-full justify-around ">
                  {pokemon.stats.map((stat) => (
                    <p key={stat.stat.name}>
                      {stat.stat.name}: {stat.base_stat}
                    </p>
                  ))}
                </div>
              </div>
              {/* MOVE */}
              <div className="mt-4 flex-1 flex flex-col items-center justify-start h-fit w-full ">
                <h3 className="text-lg font-semibold flex">Check Moves</h3>
                <p className="text-sm font-semibold">(type min. 3chr)</p>
                <input
                  className="border-2 border-black rounded-md p-2 text-black my-2"
                  type="text"
                  placeholder="Search for a move"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="flex flex-col w-full justify-around items-center">
                  {searchResults?.map((move) => (
                    <MoveCard move={move} key={move.move.name} />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
