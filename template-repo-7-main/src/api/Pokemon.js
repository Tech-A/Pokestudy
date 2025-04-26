/**
 * This file contains functions that fetch data from the PokeAPI (Hard)
 *
 * Not all functionality is implemented in this file, feel free to add more!
 * [https://pokeapi.co/docs/v2]
 */

/**
 * This endpoint fetches a pokemon by name
 * 
 * @param {string} pokemonName - any valid pokemon name 
 * @returns 
 */
export async function fetchPokemon(pokemonName) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
  const data = await response.json()
  return data
}