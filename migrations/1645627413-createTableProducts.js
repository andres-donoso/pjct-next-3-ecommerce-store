exports.up = async (sql) => {
await sql`
CREATE TABLE products (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(40) NOT NULL,
  type varchar(50) NOT NULL,
  price varchar(20) NOT NULL
);`
	// <insert magic here>
};

exports.down = async (sql) => {
	await sql`
	DROP TABLE products
	`
	// just in case...
};
