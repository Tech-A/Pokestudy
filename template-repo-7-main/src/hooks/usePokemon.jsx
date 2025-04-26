import { useState } from "react";
import { fetchPokemon } from "../api/Pokemon";

/**
 * This is a custom hook that fetches pokemon data
 */
export const usePokemon = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (pokemonName) => {
    setLoading(true);
    const pokemon = await fetchPokemon(pokemonName);
    setData(pokemon);
    setLoading(false);
  }

  // The hook returns an object containing:
  // - `data`: The fetched Pokémon data - you should call the fetchData function to populate this
  // - `loading`: A boolean flag indicating if the data is still loading
  // - `fetchData`: A function that triggers data fetching for a given Pokémon name
  // for an example of usage, refer to the /components/Pokemon.jsx file
  return { data, loading, fetchData };
}

