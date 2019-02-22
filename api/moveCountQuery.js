module.exports = `
  SELECT COUNT(DISTINCT pokemon_v2_pokemonmove.move_id)
  FROM pokemon_v2_pokemonmove
  WHERE pokemon_v2_pokemonmove.pokemon_id = $1
`