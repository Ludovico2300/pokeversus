import React, { useEffect, useState } from "react";
import PokemonCardPokedex from "./../components/PokemonCardPokedex";
import usePokeApi from "../hooks/usePokeApi";
import { Pokemon } from "../type.def";

export default function Pokedex() {
  const { fetchAllPokemon, fetchData, loading } = usePokeApi();
  const [pokedex, setPokedex] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchPokedexData = () => {
    fetchAllPokemon().then((data) => {
      setPokedex(data.results);
    });
  };

  useEffect(() => {
    fetchPokedexData();
  }, []);

  const handleSearch = () => {
    if (!searchTerm) {
      fetchPokedexData();
      return;
    } else {
      fetchData(searchTerm.toLowerCase()).then((data) => {
        setPokedex([data]);
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Pokedex</h1>
      <p className="text-lg">
        Search for a pokemon by name or type and click on it to see more
        details.
      </p>
      <p className="text-lg">Type in the search bar to search for a pokemon.</p>
      <input
        className="border-2 border-black rounded-md p-2"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="border-2 border-black rounded-md p-2"
        type="button"
      >
        Search
      </button>
      <div className="flex flex-row flex-wrap justify-around">
        {loading ? (
          <p>Loading...</p>
        ) : (
          pokedex.map((pokemon: Pokemon) => (
            <PokemonCardPokedex
              customStyle="m-2 border-[#FD0001]"
              key={pokemon.name}
              showBst
              pokemonName={pokemon.name}
              onClick={() => console.log(pokemon.name)}
            />
          ))
        )}
      </div>
    </div>
  );
}
