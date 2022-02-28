import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getProducts } from '../util/database';

const containerStyles = css`
  color: white;
`;

const itemsInCartStyles = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0rem 2rem;
  gap: 3rem;
  margin-bottom: 2rem;

  color: white;
`;
const imageStyles = css`
  border-radius: 8px;
`;
const miniCardStyles = css`
  background-color: #01397a;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 12px;
  align-items: center;
  min-width: 15vw;
`;

const addButtonStyles = css`
  margin-top: 8px;
  padding: 16px 8px;
  background-color: #787878;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;

  :hover {
    transition: ease-out 0.3s;
    background-color: black;
    border: 2px solid white;
  }
`;

const counterButtonStyles = css`
  padding: 4px;
  background-color: #787878;
  color: white;
  border-radius: 8px;
  margin-top: 8px;
  font-size: 18px;
  border: none;
  cursor: pointer;
  :hover {
    background-color: black;
  }
`;
const checkoutStyles = css`
  display: flex;
  flex-direction: column;
  padding: 12px;
  justify-content: center;
  align-items: center;
`;
export default function Cart(props) {
  const [productsInCart, setProductsInCart] = useState(props.cart);
  const [newPrice, setNewPrice] = useState(0);
  const [product, setQuantity] = useState(0);
  console.log(props);
  useEffect(() => {
    const getProduct = () => {
      console.log(props.cart);
      const quantityProduct = props.cart.map((product) => {
        return product.product;
      });

      const sum = quantityProduct.reduce((partialSum, a) => partialSum + a, 0);

      setQuantity(sum);

      const priceProduct = productsInCart.map((product) => {
        return props.productsinDb[product.id - 1].price * product.product;
      });

      const sumPrice = priceProduct.reduce(
        (partialSum, a) => partialSum + a,
        0,
      );
      console.log(sumPrice);
      setNewPrice(sumPrice);
    };

    getProduct();
  }, [props]);



  function handleDeleteCookie(id) {
    // filter products with different id than product to delete and return them
    const newCookie = productsInCart.filter((cookieObject) => {
      return cookieObject.id !== id;
    });

    setProductsInCart(newCookie);
    Cookies.set('cart', JSON.stringify(newCookie));

    const quantityProduct = newCookie.map((product) => {
      return product.product;
    });
    console.log(quantityProduct);

    const sum = quantityProduct.reduce((partialSum, a) => partialSum + a, 0);
    setQuantity(sum);

    const priceProduct = newCookie.map((product) => {
      return props.productsinDb[product.id - 1].price * product.product;
    });

    const sumPrice = priceProduct.reduce((partialSum, a) => partialSum + a, 0);
    console.log(sumPrice);
    setNewPrice(sumPrice);
  }

  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name="Cart" content="Products in cart" />
      </Head>
      <Layout items={product}>
        <div css={containerStyles}>
          <div css={itemsInCartStyles} data-test-id="cart-product-product id">
            {productsInCart.map((product) => {
              return (
                <div css={miniCardStyles} key={`product-${product.id}`}>
                  <h1>{product.name}</h1>
                  <Image
                    css={imageStyles}
                    src={`/product-images/${product.id}.jpeg`}
                    alt={product.name}
                    width="75"
                    height="75"
                  />

                  <h3>
                    {product.product < 0
                      ? handleDeleteCookie(product.id)
                      : props.productsinDb[product.id - 1].price *
                        product.product}{' '}
                    €
                  </h3>

                  <span> Amount: {product.product}</span>

                  <button
                    css={counterButtonStyles}
                    onClick={() => {
                      handleDeleteCookie(product.id);
                    }}
                    data-test-id={`cart-product-remove-${product.id}`}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
          <div css={checkoutStyles}>
            <h2 data-test-id="cart-total">
              Total: {newPrice}€ for {product} {product > 1 ? 'Cards' : 'Card'}
            </h2>

            <button
              onClick={() =>
                Router.push('./checkout').catch((error) => console.log(error))
              }
              css={addButtonStyles}
              data-test-id="cart-checkout"
            >
              Checkout
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  // context allow to acces cookies
  // important, always return an object from getserversideprops and always return a key (props is the key)

  const cartOnCookies = context.req.cookies.cart || '[]';

  const cart = JSON.parse(cartOnCookies);
  // // 1. get the cookies from the browser

  // 2. pass the cookies to the frontend
  const productsinDb = await getProducts();
  return {
    props: {
      cart: cart,
      productsinDb,
    },
  };
}