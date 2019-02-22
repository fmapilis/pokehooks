import PokemonList from "../components/functions/PokemonList";
import MoveList from "../components/functions/MoveList";

export default () => {
  const [selectedPokemon, setPokemon] = React.useState();
  return (
    <div id="lists">
      <PokemonList
        selectedPokemon={selectedPokemon}
        setPokemon={setPokemon}
      />
      { selectedPokemon
        ? <MoveList
          selectedPokemon={selectedPokemon}
          key={selectedPokemon}
        />
        : <div id="move-list">
          👈 Choose a Pokémon
        </div>
      }

    </div>
  )
}
