import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { getSingleProduct } from '../../util/database';

const centerProductStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 3rem;
`;
const itemProductStyles = css`
  width: 300px;
  background-color: #01397a;
  color: white;
  border: 2px solid black;
  border-radius: 8px;
  padding: 2px 8px 32px 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px,
    rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px,
    rgba(240, 46, 170, 0.05) 25px 25px;
`;
const imageStyles = css`
  border-radius: 8px;
`;
const counterDivStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 15vw;
  gap: 10px;
`;

const counterButtonStyles = css`
  padding: 4px;
  background-color: #787878;
  color: white;
  border-radius: 8px;
  height: 40px;
  width: 40px;
  font-size: 26px;
  border: none;
  cursor: pointer;
  :hover {
    background-color: black;
    transition: ease-out 0.3s;
  }
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
  }
`;

const spanStyles = css`
  margin: 2px 8px;
`;
// import

// type Props = {
//   product: Product;
// };

export type Products = {
  id: number;
  name: string;
  price?: number;
  quantity: number;
};

type Props = {
  product: Products;
  cart: Products[];
  // Quantity
//InCart: any;
  // items: any;
};


export default function SingleProduct(props: Props) {
  const [quantity, setQuantity] = useState(1);
  const [quantityInCart, setQuantityInCart] = useState<Number>();
  const [minQuantity
, setMinQuantity] = useState('');
  const [addedToCart, setAddedToCart] = useState('');

  useEffect(() => {
    const getQuantity = () => {
      console.log(props.cart);
      const priceProduct = props.cart.map((product) => {
        return product.quantity;
      });

      const sum = priceProduct.reduce((partialSum, a) => partialSum + a, 0);

      setQuantityInCart(sum);
    };

    getQuantity();
  }, [props.cart]);

  const handleIncrementQuantity = () => {
    setQuantity(quantity + 1);
    setMinQuantity('');
  };

  const handleDecrementQuantity = () => {
    if (quantity <= 1) {
      setQuantity(1);
      setMinQuantity('You can only buy one or more of this product');
      return;
    }
    setQuantity(quantity - 1);
  };

  function handleAddToCookie(id: Number) {
    if (quantity === 1) {
      setAddedToCart(`You added one item to the cart.`);
    } else {
      setAddedToCart(`You added ${quantity} items to the cart.`);
    }

    const cookieValue: Array = JSON.parse(Cookies.get('cart') || '[]');

    type Object = {
      id: number;
    };

    const existOnArray = cookieValue.some((cookieObject: Object) => {
      return cookieObject.id === id;
    });

    const productInCart = cookieValue.find((cookieObject: Object) => {
      return cookieObject.id === id;
    });
    type Array = [
      {
        id: number;
        quantity: number;
        name: string;
      },
    ];

    let newCookie;
    if (existOnArray && productInCart !== undefined) {
      const newQuantity
: number = quantity + productInCart.quantity;

      newCookie = [
        ...cookieValue,
        {
          id: props.product.id,
          quantity: newQuantity
,

          name: props.product.name,
        },
      ];

       // filter products that are not to be updated, and filter out the old product that is updated
       const cookieUpdated = newCookie.filter(
        (cookieObject) =>
          cookieObject.id !== id ||
          (cookieObject.id === id && cookieObject.quantity === newQuantity
),
      );

      Cookies.set('cart', JSON.stringify(cookieUpdated));

      const priceProduct = cookieUpdated.map((product) => {
        return product.quantity;
      });

      const sum = priceProduct.reduce((partialSum, a) => partialSum + a, 0);

      setQuantityInCart(sum);
    } else {
      newCookie = [
        ...cookieValue,
        {
          id: props.product.id,
          quantity: quantity,

          name: props.product.name,
        },
      ];

      Cookies.set('cart', JSON.stringify(newCookie));

      const priceProduct = newCookie.map((product) => {
        return product.quantity;
      });

      const sum = priceProduct.reduce((partialSum, a) => partialSum + a, 0);

      setQuantityInCart(sum);
    }
  }

  return (
    <>
      <Head>
        <title>{props.product.name}</title>

        <meta name="Single product page" content="View single product by id" />
      </Head>
      <Layout items={quantityInCart}>
        <div css={centerProductStyles}>
          <h3>{addedToCart}</h3>
          <div css={itemProductStyles}>
            <h1>{props.product.name}</h1>

            <Image
              css={imageStyles}
              src={`/product-images/${props.product.id}.jpeg`}
              alt={props.product.name}
              width="250"
              height="250"
            />

            <h3> {props.product.price} €</h3>
            <div css={counterDivStyles}>
              <p>{minQuantity
}</p>
              <div>
                <button
                  css={counterButtonStyles}
                  onClick={() => {
                    handleDecrementQuantity();
                  }}
                >
                  -
                </button>
                <span css={spanStyles}>{quantity}</span>
                <button
                  css={counterButtonStyles}
                  onClick={() => {
                    handleIncrementQuantity();
                  }}
                >
                  +
                </button>{' '}
              </div>
              <button
                css={addButtonStyles}
                data-test-id="product-add-to-cart"
                onClick={() => handleAddToCookie(props.product.id)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cartOnCookies = context.req.cookies.cart || '[]';

  const cart = JSON.parse(cartOnCookies);
  const productId = context.query.productId;

  // Only get single product with id from db and store it in variable product
  const product = await getSingleProduct(productId);
  return {
    props: {
      cart: cart,
      product: product,
    },
  };
}

//   const [addedToCartArray, setAddedToCartArray] = useState(
//     props.addToCartProducts,
//   );

//   const currentProductObject = addedToCartArray.find(
//     (cookieObject) => cookieObject.id === props.product.id,
//   );

//   console.log('currentProductObject :', currentProductObject);

//   function quantityCountUp() {
//     // bc we render the button only when it's liked, then we can be certain that the object always is on the cookie

//     // 1. get the current cookie value
//     const cookieValue = JSON.parse(Cookies.get('addToCartProducts') || '[]');
//     // 2. update the quantity count to +1
//     const newCookie = cookieValue.map((cookieObject) => {
//       // IF the object of the product is on this page, THEN update quantity
//       if (cookieObject.id === props.product.id) {
//         return { ...cookieObject, quantity: cookieObject.quantity + 1 };
//       } else {
//         // IF it is not the object of the product on this page, THEN  do nothing
//         return cookieObject;
//       }
//     });

//     // 3. update cookie and state
//     setAddedToCartArray(newCookie);
//     Cookies.set('addToCartProducts', JSON.stringify(newCookie));
//   }

//   return (
//     <Layout>
//       <Head>
//         <title>
//           {props.product.name} ({props.product.type})
//         </title>
//         <meta
//           name="description"
//           description={`${'product.name'} is a ${'product.type'}`}
//         />
//       </Head>
//       <Image
//         data-test-id="product-image"
//         src={`/product-images/${props.product.id}.png`}
//         width="300"
//         height="300"
//       />
//       <h1>
//         {props.product.name} ({props.product.type})
//       </h1>
//       <div>{props.product.description}</div>
//       <br></br>
//       {currentProductObject ? (
//         <button
//           data-test-id="product-quantity"
//           onClick={() => quantityCountUp()}
//         >
//           quantity: 🛒 {currentProductObject.quantity}{' '}
//         </button>
//       ) : (
//         'not added to cart'
//       )}
//     </Layout>
//   );
// }

// // The parameter 'context' gets passed from Next.js and includes a bunch of info about the request
// export function getServerSideProps(context) {
//   const addToCartProductsOnCookies =
//     context.req.cookies.addToCartProducts || '[]';
//   // if there is no likedAnimals cookie on the browser we store to an [] otherwise we get the cooke value and parse it
//   const addToCartProducts = JSON.parse(addToCartProductsOnCookies);

//   // This is the variable that we get from the URL
//   // (anything after the slash)
//   const productId = context.query.productId;
//   // console.log('db', productsDatabase);d
//   const matchingProduct = productsDatabase.find((product) => {
//     // eslint-disable-next-line sonarjs/prefer-single-boolean-return
//     if (product.id === productId) {
//       return true;
//     } else {
//       return false;
//     }
//   });
//   return {
//     props: {
//       addToCartProducts,
//       product: matchingProduct,
//       // productId: productId,
//     },
//   };
// }
