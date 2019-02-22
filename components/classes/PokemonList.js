import httpClient from "../../api/httpClient";
import Loading from "../Loading";
import PokemonSprite from "../PokemonSprite";

class PokemonList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: [],
      total: null,
      loading: true
    };

    this.listRef = React.createRef();
  }

  componentDidMount() {
    const list = this.listRef.current;
    list.addEventListener("scroll", this.onListScroll);

    this.loadPokemon();
  }

  componentWillUnmount() {
    const list = this.listRef.current;
    list.removeEventListener("scroll", this.onListScroll);
  }

  onListScroll = ({ target }) => {
    if (
      !this.state.loading &&
      this.state.pokemon.length !== this.state.total &&
      target.scrollTop + target.offsetHeight + 40 >= target.scrollHeight
    ) {
      this.loadPokemon();
    }
  }

  handleRowClick = ({ currentTarget: { value }}) => {
    this.props.setPokemon(parseInt(value, 10))
  }

  loadPokemon = async() => {
    this.setState({ loading: true });

    const { pokemon } = this.state;
  
    const { data } = await httpClient.get("/pokemon", {
      params: {
        limit: 15,
        offset: this.state.pokemon.length
      }
    });

    this.setState({
      pokemon: pokemon.concat(data.pokemon),
      total: data.total,
      loading: false
    })
  }

  render() {
    return (
      <div id="pokemon-list" ref={this.listRef}>
        {this.state.pokemon.map(pokemon =>
         <button
          key={pokemon.id}
          value={pokemon.id}
          className={`pokemon-row${this.props.selectedPokemon === pokemon.id ? " active" : ""}`}
          onClick={this.handleRowClick}>
           <PokemonSprite name={pokemon.species_name} />
           <span>
            {pokemon.name}
           </span>
         </button> 
        )}

        {this.state.pokemon.length !== this.state.total &&
          <Loading />
        }
      </div>
    )
  }
}

export default PokemonList;