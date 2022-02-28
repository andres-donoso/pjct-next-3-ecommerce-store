import Head from 'next/head';
import Header from './Header';

export default function Layout(props) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>{props.children}</main>
    </div>
  );
}
