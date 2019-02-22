import Loading from "../Loading";
import PokemonSprite from "../PokemonSprite";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

export default ({ selectedPokemon, setPokemon }) => {
  const [ pokemon, listRef, total ] = useInfiniteScroll(
    "/pokemon",
    "pokemon",
    15
  );

  return (
    <div id="pokemon-list" ref={listRef}>
      { pokemon.map(pkmn =>
        <button
          key={pkmn.id}
          value={pkmn.id}
          className={`pokemon-row${selectedPokemon === pkmn.id ? " active" : ""}`}
          onClick={(e) => {
            setPokemon(e.target.value);
          }}>
          <PokemonSprite name={pkmn.species_name} />
          <span>
            {pkmn.name}
          </span>
        </button> 
      )}

      { pokemon.length !== total &&
        <Loading />
      }
    </div>
  );
};