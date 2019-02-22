import httpClient from "../../api/httpClient";
import Loading from "../Loading";

class MoveList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      moves: [],
      total: null,
      loading: true
    };

    this.listRef = React.createRef();
  }

  componentDidMount() {
    const list = this.listRef.current;
    list.addEventListener("scroll", this.onListScroll);

    this.loadMoves();
  }

  componentWillUnmount() {
    const list = this.listRef.current;
    list.removeEventListener("scroll", this.onListScroll);
  }

  onListScroll = ({ target }) => {
    if (
      !this.state.loading &&
      this.state.moves.length !== this.state.total &&
      target.scrollTop + target.offsetHeight + 40 >= target.scrollHeight
    ) {
      this.loadMoves();
    }
  }

  loadMoves = async() => {
    this.setState({ loading: true });

    const { moves } = this.state;
  
    const { data } = await httpClient.get(`/pokemon/${this.props.selectedPokemon}/moves`, {
      params: {
        limit: 20,
        offset: this.state.moves.length
      }
    });

    this.setState({
      moves: moves.concat(data.moves),
      total: data.total,
      loading: false
    })
  }

  render() {
    return (
      <div id="move-list" ref={this.listRef}>
        {this.state.moves.map(move =>
          <div key={move.move_id} className="move-row">
            {move.name}
          </div>
        )}

        {this.state.moves.length !== this.state.total &&
          <Loading />
        }
      </div>
    );
  }
}

export default MoveList;