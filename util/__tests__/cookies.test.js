import {
  getProduct,
  handleAddToCookie,
  handleDeleteCookie,
  updateQuantity,
} from '../cookies.js';

const products = [
  { id: 1, quantity: 2, name: 'Enchiridion' },
  { id: 2, quantity: 2, name: 'Imagination Machine' },
];

test('sum up products in cart', () => {
  expect(getProduct(products)).toBe(4);
});

test('update quantity of in-cart-cookie when adding same product', () => {
  const updateProducts = [
    { id: 2, quantity: 2, name: 'Imagination Machine' },
    { id: 1, quantity: 6, name: 'Enchiridion' },
  ];
  expect(updateQuantity(1, 4, products)).toStrictEqual(updateProducts);
});

test('delete pokemon with id 1', () => {
  const deleteProducts = [{ id: 2, quantity: 2, name: 'Imagination Machine' }];
  expect(handleDeleteCookie(1, products)).toStrictEqual(deleteProducts);
});

test('add pokemon with id 1', () => {
  const deleteProducts = [{ id: 1, quantity: 2, name: 'Enchiridion' }];
  expect(handleAddToCookie(2, 2, 'Imagination Machine', deleteProducts)).toStrictEqual(
    products,
  );
});