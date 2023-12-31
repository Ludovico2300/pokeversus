import React, { useEffect, useState } from "react";
import PokemonCardPokeDex from "../components/PokemonCardPokedex";
import usePokeApi from "../hooks/usePokeApi";
import { Pokemon } from "../types/pokemon";
import useDatabaseFirebase from "../hooks/useDatabaseFirebase";
import { MdFavorite } from "react-icons/md";

export default function PokeDex() {
  const { user, favPokemon } = useDatabaseFirebase();
  const { fetchAllPokemon, loading, fetchData } = usePokeApi();
  const [pokedex, setPokedex] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const [showFav, setShowFav] = useState<boolean>(false);
  const [favPokemons, setFavPokemons] = useState<Pokemon[]>([]);

  const fetchPokeDexData = () => {
    fetchAllPokemon().then((data) => {
      setPokedex(data.results);
    });

    if (favPokemon) {
      const promises = favPokemon.map((pokemonId) => {
        return fetchData(pokemonId).then((data) => data);
      });

      Promise.all(promises)
        .then((favoritePokemonData) => {
          setFavPokemons(favoritePokemonData);
        })
        .catch((error) => {
          console.error("Error fetching favorite Pokemon:", error);
        });
    }
  };

  useEffect(() => {
    fetchPokeDexData();
  }, [showFav]);

  // Calculate the range of Pokemon to display based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Create a separate array for search results
  const searchResults = pokedex.filter((pokemon) =>
    pokemon.name.includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (searchResults.length <= itemsPerPage) setCurrentPage(1);
  }, [itemsPerPage, searchResults]);

  const pokemonToDisplay = showFav ? favPokemons : searchResults;

  return (
    <>
      <div className="flex flex-col items-center justify-start absolute top-[1vh]">
        <h1 className="text-3xl font-bold">PokeDex</h1>
        <p className="text-lg">
          Search for a Pokemon by name or type and click on it to see more
          details.
        </p>
        <p className="text-lg">
          Type in the search bar to search for a Pokemon.
        </p>
        <div className="flex flex-row items-center w-[90vw] justify-around my-2">
          <div className="flex flex-row items-center w-[30vw] justify-around my-2">
            <input
              className="border-2 border-black rounded-md p-2"
              type="text"
              placeholder="Search for a Pokemon"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {user && (
            <MdFavorite
              size={50}
              color={showFav ? "black" : "white"}
              onClick={() => setShowFav(!showFav)}
              className="cursor-pointer"
            />
          )}
          <div className="flex flex-row items-center w-[30vw] justify-around my-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className=" border-2 border-black rounded-md p-2 hover:border-white hover:text-white transition-colors duration-300 ease-in-out"
            >
              {`<--`}
            </button>
            <div className="border-2 border-black rounded-md p-2 hover:border-white hover:text-white transition-colors duration-300 ease-in-out">
              {currentPage}
            </div>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={endIndex >= searchResults.length}
              className="border-2 border-black rounded-md p-2 hover:border-white hover:text-white transition-colors duration-300 ease-in-out"
            >
              {`-->`}
            </button>
          </div>
          <div className="flex flex-row items-center w-[30vw] justify-around my-2">
            <p className="text-lg">Items per Page:</p>

            <input
              className="border-2 border-black rounded-md p-2"
              type="number"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="flex flex-row flex-wrap justify-around">
          {loading ? (
            <p>Loading...</p>
          ) : (
            pokemonToDisplay
              .slice(startIndex, endIndex)
              .map((pokemon: Pokemon) => (
                <PokemonCardPokeDex
                  customStyle="m-2 border-[#FD0001] max-w-[8vw]"
                  key={pokemon.name}
                  showBst
                  pokemonName={pokemon.name}
                />
              ))
          )}
        </div>
      </div>
    </>
  );
}
