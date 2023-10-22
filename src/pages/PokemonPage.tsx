import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePokeApi from "../hooks/usePokeApi";
import pokeballspinning from "../assets/img/pokeballspinning.gif";
import { Pokemon } from "../types/pokemon";
import { PokemonFull } from "../types/pokemonSpecies";
import TypeIcon from "../components/TypeIcon";
import pokeballImage from "../assets/img/pokemon/pokeball.png";
import shinySymbolPokemon from "../assets/img/pokemon/shiny_symbol_pokemon.png";
import missingno from "../assets/img/MissingNo_Ghost.webp";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
import { MdFavorite } from "react-icons/md";
import useAuthFirebase from "../hooks/useAuthFirebase";
import useDatabaseFirebase from "../hooks/useDatabaseFirebase";

export default function PokemonPage() {
  const { currentUser } = useAuthFirebase();
  const { favPokemon, toggleFavorite, user } = useDatabaseFirebase();
  const { id } = useParams();
  const { fetchData, loading, fetchPokemonDetail } = usePokeApi();
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [pokemonDetails, setPokemonDetails] = useState<PokemonFull>();
  const [entryNum, setEntryNum] = useState<number>(0);
  const [isShiny, setIsShiny] = useState<boolean>(false);
  //@ts-ignore
  const isInFav = favPokemon ? favPokemon.includes(pokemon?.id) : false;
  console.log("isInFav", isInFav);
  const [isFavorite, setIsFavorite] = useState<boolean>();

  useEffect(() => {
    if (favPokemon && currentUser) {
      setIsFavorite(isInFav);
      console.log("isFavorite", isFavorite);
    }
  }, [currentUser, favPokemon, id, isFavorite, isInFav, toggleFavorite]);

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

  const prevPage = () => {
    if (pokemon) {
      // Calculate the previous ID
      const previousId = pokemon.id - 1;
      if (previousId >= 1) {
        // Navigate to the previous page only if within the range
        window.location.href = `/pokedex/${previousId}`;
      }
    }
  };
  const nextPage = () => {
    if (pokemon) {
      const nextId = pokemon.id + 1;
      if (nextId <= 1010) {
        // Navigate to the next page only if within the range
        window.location.href = `/pokedex/${nextId}`;
      }
    }
  };

  /*   useEffect(() => {
    const handleKeyPress = (e: any) => {
      if (pokemon) {
        if (e.key === "ArrowLeft") {
          prevPage();
        } else if (e.key === "ArrowRight") {
          nextPage();
        }
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      // Cleanup: remove the event listener when the component unmounts
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [pokemon]); */

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
              {user && (
                <MdFavorite
                  size={50}
                  color={isFavorite ? "red" : "white"}
                  onClick={() => toggleFavorite(pokemon.id)}
                  className="cursor-pointer"
                />
              )}
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
                  (loading
                    ? pokeballspinning
                    : isShiny
                    ? pokemon?.sprites.front_shiny
                    : pokemon?.sprites.front_default) ?? missingno
                }
                alt={pokemon.name}
                height={200}
                width={200}
                className="rounded-3xl mx-auto"
              />

              {/* NAME - TYPES */}
              <div className="flex justify-center items-center">
                {/*                 <BsFillArrowLeftSquareFill
                  color="white"
                  size={"20"}
                  onClick={() => prevPage()}
                /> */}
                <div className="flex flex-col font-bold items-center justify-around">
                  <div className="text-lg font-bold uppercase">
                    #{pokemon.id}
                  </div>
                  <div className="text-lg font-bold uppercase">
                    {pokemon.name}
                  </div>
                </div>
                {/*                 <BsFillArrowRightSquareFill
                  color="white"
                  size={"20"}
                  onClick={() => nextPage()}
                /> */}
              </div>
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
              TOTAL BST
              <p className="text-lg font-bold">
                {pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0)}
              </p>
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
          {pokemonDetails &&
            pokemonDetails.flavor_text_entries &&
            pokemonDetails.flavor_text_entries[entryNum] && (
              <div className="mt-4 flex flex-col items-center h-[25%] w-full justify-between p-4 border rounded-lg">
                <h3 className="text-lg font-semibold">Descriptions</h3>
                <div className="flex justify-center item-center text-sm font-semibold w-full">
                  {pokemonDetails.flavor_text_entries[entryNum].flavor_text ||
                    "no description..."}
                </div>
                <div className="flex w-full justify-around">
                  <button
                    onClick={() => setEntryNum(entryNum - 1)}
                    disabled={entryNum === 0}
                  >
                    PREV
                  </button>
                  <p>
                    {pokemonDetails.flavor_text_entries[
                      entryNum
                    ].version.name.toUpperCase()}{" "}
                    -{" "}
                    {pokemonDetails.flavor_text_entries[
                      entryNum
                    ].language.name.toUpperCase()}
                  </p>
                  <button
                    onClick={() => setEntryNum(entryNum + 1)}
                    disabled={
                      entryNum === pokemonDetails.flavor_text_entries.length - 1
                    }
                  >
                    NEXT
                  </button>
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );
}
