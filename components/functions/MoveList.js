import Loading from "../Loading";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

export default ({ selectedPokemon }) => {
  const [ moves, listRef, total ] = useInfiniteScroll(
    `/pokemon/${selectedPokemon}/moves`,
    "moves",
    20
  );

  return (
    <div id="move-list" ref={listRef}>
      { moves.map(move =>
        <div key={move.move_id} className="move-row">
          {move.name}
        </div>
      )}

      { moves.length !== total &&
        <Loading />
      }
    </div>
  );
};