export default class BuddyName extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.initialName
    }

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value})
  }

  render () {
    return (
      <div className="name">
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
      </div>
    )
  }
}