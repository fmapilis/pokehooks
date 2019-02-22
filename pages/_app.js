import App, { Container } from "next/app";
import Link from "next/link"
import Head from "next/head";

export default class PokeApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>Pokéhooks</title>
        </Head>
        <nav>
          <Link href="/buddy"><a>💛Buddy</a></Link>
          <Link href="/moves"><a>💥Moves</a></Link>
        </nav>
        <div id="app">
          <Component {...pageProps} />
        </div>
      </Container>
    );
  }
}