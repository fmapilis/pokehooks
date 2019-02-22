import Document, { Head, Main, NextScript } from "next/document";

class PokeDoc extends Document {
  render() {
    return (
      <html lang="en" dir="ltr">
        <Head>
          <link href="/static/styles/style.css" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet" />
          <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default PokeDoc;