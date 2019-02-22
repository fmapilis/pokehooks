export default class PokeError extends React.Component {
  static getInitialProps({ res, err } ) {
    const statusCode = res && res.statusCode ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
  }
  render() {
    const { statusCode } = this.props;
    const title = statusCode === 404 ? 'This page could not be found' : 'An unexpected error has occurred';
    return (
      <div id="error">
        {statusCode} | {title}
      </div>
    )
  }
}