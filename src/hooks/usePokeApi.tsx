import { useState } from "react";

export default function usePokeApi() {
  const [loading, setLoading] = useState(false);

  const fetchData = async (pokemonID: number | string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonID}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const fetchPokemonDetail = async (pokemonID: number | string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchAllPokemon = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=1010`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return { fetchData, loading, fetchAllPokemon, fetchPokemonDetail };
}
