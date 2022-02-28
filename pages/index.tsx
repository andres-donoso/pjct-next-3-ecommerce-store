import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getProducts } from '../util/database';

const containerStyles = css`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  margin-bottom: 2rem;
  justify-content: center;
  a {
    text-decoration: none;
    color: black;
  }
`;

const productCardStyles = css`
  height: 350px;
  width: 250px;
  background-color: #01397a;
  color: white;
  border: 2px solid black;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.8;
  :hover {
    box-shadow: rgb(85, 91, 255) 0px 0px 0px 3px,
      rgb(31, 193, 27) 0px 0px 0px 6px, rgb(255, 217, 19) 0px 0px 0px 9px,
      rgb(255, 156, 85) 0px 0px 0px 12px, rgb(255, 85, 85) 0px 0px 0px 15px;
    opacity: 1;
    transition: 0.3s ease-in-out;
  }
`;

const centerHeadingStyles = css`
  display: flex;
  justify-content: center;
  h1 {
    color: white;
  }
`;

const imageStyles = css`
  border-radius: 8px;
`;

type Props = {
  productsinDb: Product[];
  cart: Product[];
};

export default function Home(props: Props) {
  const [quantityInCart, setQuantityInCart] = useState<number>();

  useEffect(() => {
    const getQuantity = () => {
      const priceProduct = props.cart.map((product) => {
        return product.quantity;
      });

      const sum = priceProduct.reduce((partialSum, a) => partialSum + a, 0);

      setQuantityInCart(sum);
    };

    getQuantity();
  }, [props]);

  console.log(props);
  return (
    <>
      <Head>
        <title>Product</title>
        <meta name="Product Page" content="Product for sale" />
      </Head>
      <Layout items={quantityInCart}>
        <div css={centerHeadingStyles}>
          {' '}
          <h1>Available Products</h1>
        </div>
        <div css={containerStyles}>
          {props.productsInDb.map((product) => {
            return (
              <div key={product.id}>
                <Link
                  href={`/products/${product.id}`}
                  key={'pokemon-' + product.id}
                >
                  <a>
                    <div
                      data-test-id={`product-${product.id}`}
                      css={productCardStyles}
                    >
                      <h2>{product.name}</h2>

                      <Image
                        css={imageStyles}
                        src={`/product-images/${product.id}.jpeg`}
                        height="200%"
                        width="200%"
                        alt={`Image of Product ${product.name}`}
                      />
                    </div>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </Layout>
    </>
  );
}
// Code in getserversideprops runs only in node js -> terminal console, you can read files from file system, connect to database
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // context allow to acces cookies
  // important, always return an object from getserversideprops and always return a key (props is the key)

  const cartOnCookies = context.req.cookies.cart || '[]';

  const cart = JSON.parse(cartOnCookies);

  const productsInDb = await getProducts();

  return {
    props: {
      cart: cart,
      productsInDb: productsInDb
    },
  };
}