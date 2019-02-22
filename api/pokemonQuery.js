module.exports = `
  SELECT pokemon_v2_pokemonspecies.id, pokemon_v2_pokemonspeciesname.name, pokemon_v2_pokemonspecies.name as species_name
  FROM pokemon_v2_pokemonspecies
  INNER JOIN pokemon_v2_pokemonspeciesname
    ON (
      pokemon_v2_pokemonspeciesname.pokemon_species_id=pokemon_v2_pokemonspecies.id AND
      pokemon_v2_pokemonspeciesname.language_id=9
    )
  LIMIT $1
  OFFSET $2;
`