import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" sizes="any" href="/favicon.svg" />
        <meta name="description" content="SyncScript - The Seamless Productivity Experience" />
        <meta name="theme-color" content="#4A90E2" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

