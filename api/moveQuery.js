module.exports = `
  SELECT DISTINCT pokemon_v2_pokemonmove.move_id, pokemon_v2_movename.name, pokemon_v2_pokemonmove.pokemon_id
  FROM pokemon_v2_pokemonmove
  LEFT JOIN pokemon_v2_movename 
    ON (
      pokemon_v2_movename.move_id=pokemon_v2_pokemonmove.move_id
      AND pokemon_v2_movename.language_id = 9
    )
  WHERE pokemon_v2_pokemonmove.pokemon_id = $1
  ORDER BY pokemon_v2_movename.name
  LIMIT $2
  OFFSET $3
`;