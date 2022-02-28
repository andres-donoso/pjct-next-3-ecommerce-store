import Head from 'next/head';
import Layout from '../components/Layout';

export default function About () {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="About the store" />

      </Head>
      <h1>About</h1>
      <p>This is the soon-to-be about page.</p>
      </Layout>
  );
}