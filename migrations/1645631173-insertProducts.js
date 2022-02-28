const productsDatabase = [
  {
    name: 'Enchiridion',
    type: 'Book',
    price: '49 €',
  },
  {
    name: 'Imagination Machine',
    type: 'Machine',
    price: '100 €',
  },
  {
    name: 'Neptr (Never-Ending Pie-Throwing Robot)',
    type: 'Robot',
    price: '99 €',
  },
  {
    name: 'Universal Translator Device',
    type: 'Device',
    price: '149 €',
  },
];

exports.up = async (sql) => {
  await sql`
INSERT INTO products ${sql(products, 'name', 'type', 'price')}
`;
  // <insert magic here>
};

exports.down = async (sql) => {
  // just in case...
};
