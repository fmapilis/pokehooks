import BuddyName from "../components/functions/BuddyName";
import PokemonSprite from "../components/PokemonSprite";

export default () => {
  return (
    <div id="buddy">
      <BuddyName initialName="Pikachu" />
      <PokemonSprite name="pikachu" />
    </div>
  );
}