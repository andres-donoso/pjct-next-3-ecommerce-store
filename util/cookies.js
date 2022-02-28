export function updateQuantity(id, value, productArray) {
  let newCookie = [];

  const productInCart = productArray.find((cookieObject) => {
    return cookieObject.id === id;
  });

  const newProduct = value + productInCart.amount;

  newCookie = [
    ...productArray,
    {
      id: productInCart.id,
      amount: newProduct,

      name: productInCart.name,
    },
  ];
  const cookieUpdated = newCookie.filter(
    (cookieObject) =>
      cookieObject.id !== id ||
      (cookieObject.id === id) & (cookieObject.amount === newProduct),
  );

  return cookieUpdated;
}

export const getProduct = (productsInCart) => {
  const quantityProduct = productsInCart.map((pokemon) => {
    return pokemon.amount;
  });

  const sum = quantityProduct.reduce((partialSum, a) => partialSum + a, 0);

  return sum;
};

export function handleDeleteCookie(id, productsInCart) {
  const newCookie = productsInCart.filter((cookieObject) => {
    return cookieObject.id !== id;
  });

  return newCookie;
}

export function handleAddToCookie(id, quantity, name, productsInCart) {
  const newCookie = [
    ...productsInCart,
    {
      id: id,
      quantity: quantity,
      name: name,
    },
  ];

  return newCookie;
}