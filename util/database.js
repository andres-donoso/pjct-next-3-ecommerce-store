import { config } from 'dotenv-safe';
import postgres from 'postgres';

// Don't copy this readFileSync - u won't
// it
// console.log(readFileSync('./README.md', 'utf-8'));
// Read the env variables from the .env file, which will then be
// available for following code

config();

// const sql = postgres();

// export async function readProducts() {
//   const products = await sql`
//   SELECT * FROM products;
// `;
//   return Products;
// }

// connect to database
const sql = postgres();


export async function getProducts() {
  const products = await sql<Product>`
  SELECT * FROM products;
  `;
  return products;

}
console.log(product);

// export async function getProducts() {
//   const products = await sql`
// SELECT * FROM products;

// `;
// console.log('products :', products);

export async function getSingleProduct(id) {
  const [product] = await sql [Product  | undefined]`
  --still an array
  SELECT * FROM products WHERE id = ${id};
`;
  return product;
}

export async function createProduct(
  name,
  type,
  price,
) {
  const [product] = await sql[Product]`
    INSERT INTO animals
      (name, type, price)
    VALUES
      (${name}, ${type}, ${price})
          RETURNING *
  `;
  return product;
}

// const productsDatabase = [
//   {
//     id: '1',
//     name: 'Enchiridion',
//     type: 'Book',
//     price: '49 €',
//     description:
//       'The Enchiridion (which translates to "The Handbook" or "The Manual") was an ancient book with codes of conduct, guidelines, and other helpful information for heroes. The book had great power which allowed it to tear open worm holes between dimensions in the multiverse. It was broken into pieces after turning to stone by Finn in "The Lich" in order to stop the Lich from gaining access to the multiverse, but, as it turned out, by doing this Finn made the portal to the multiverse. It was revealed in "Winter Light" that while Finn and Jake were in the Farmworld Dimension during the events of "Crossover," Finn brought the Enchiridion from that timeline back with him.',
//   },
//   {
//     id: '2',
//     name: 'Imagination Machine',
//     type: 'Machine',
//     price: '100 €',
//     description:
//       'The imagination machine is an imaginary control panel that controls Jake\'s imagination in the episode "Rainy Day Daydream." Jake imagines it to turn off his imagination, so that he and Finn do not get killed by it. However, after Finn turns Jake\'s imagination off, Jake becomes very dull, and his imagination machine ceases to exist as well.',
//   },
//   {
//     id: '3',
//     name: 'Neptr (Never-Ending Pie-Throwing Robot)',
//     type: 'Robot',
//     price: '99 €',
//     description:
//       'Neptr (or N.E.P.T.R., an acronym for Never-Ending Pie-Throwing Robot) is a pie-throwing robot Finn created solely to prank Jake who first appears in "What is Life?". He usually calls Finn "Creator", and the Ice King "Papi".',
//   },
//   {
//     id: '4',
//     name: 'Universal Translator Device',
//     type: 'Device',
//     price: '149 €',
//     description:
//       'The universal translator device is a device that appears in the episode "My Two Favorite People." Jake originally wanted for him, Finn, and Lady Rainicorn to hang out together, but an evident problem was that Lady Rainicorn only spoke in Korean and Finn couldn\'t understand her. Jake mentions that he had previously thrown the translator into a lake. The trio then go to retrieve the translator from the bottom of a lake, which was guarded by Lake Knights. Ultimately, Jake takes the translator off of Lady Rainicorn and throws it away after Finn wins his battle with Tiffany.',
//   },
// ];

// export default productsDatabase;

// const productsDatabase = [
//   {
//     id: '1',
//     name: 'Tiny',
//     type: 47,
//     type: 'Dragon',
//   },
//   {
//     id: '2',
//     name: 'Pete',
//     type: 4,
//     type: 'Iguana',
//   },
//   {
//     id: '3',
//     name: 'Randolph',
//     type: 9,
//     type: 'Parakeet',
//   },
//   {
//     id: '4',
//     name: 'George',
//     type: 2,
//     type: 'Tiger',
//   },
//   {
//     id: '5',
//     name: 'Lila',
//     type: 17,
//     type: 'Monkey',
//   },
//   {
//     id: '6',
//     name: 'Suchi',
//     type: 20,
//     type: 'Bunny',
//   },
//   {
//     id: '7',
//     name: 'Susi',
//     type: 28,
//     type: 'Wombat',
//   },
//   {
//     id: '8',
//     name: 'Lulu',
//     type: 21,
//     type: 'Dog',
//   },
// ];

// export default productsDatabase;
