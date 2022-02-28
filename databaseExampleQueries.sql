-- This file is only my notes, changing
-- this file doesn't change anything in
-- the database

-- Create products table
CREATE TABLE products (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(50) NOT NULL,
  type varchar(30) NOT NULL,
  price varchar(50) NOT NULL,
  quantity varchar(99) NOT NULL

  -- This file is only my notes, changing
-- this file doesn't change anything in
-- the database

-- Create products table
CREATE TABLE products (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(80) NOT NULL,
  type varchar(80) NOT NULL,
  price money NOT NULL
);

-- // NUMERIC(6, 4)

-- Insert some products (C in CRUD - Create)
INSERT INTO products
  (name, type, price)
VALUES
  ('Enchiridion', 'Book', '49'),
  ('Imagination Machine', 'Machine', '100'),
  ('Neptr (Never-Ending Pie-Throwing Robot)', 'Robot', '99'),
  ('Universal Translator Device', 'Device', '149');


-- Read some products (R in CRUD - Read)
SELECT * FROM products;

varchar(30) NOT NULL
);

DROP TABLE products;


-- Insert some products (C in CRUD - Create)
INSERT INTO products
  (name, age, price)
VALUES
  ('Tiny', 47, 'Dragon', 'Monacle'),
  ('Pete', 4, 'Iguana', 'Top Hat'),
  ('Randolph', 9, 'Parakeet', 'Ring'),
  ('George', 2, 'Tiger', 'Gold Chain'),
  ('Lila', 17, 'Monkey', 'Covid Mask'),
  ('Suchi', 20, 'Bunny', 'Sword'),
  ('Susi', 28, 'Wombat', 'Cane'),
  ('Lulu', 21, 'Dog', 'Cane');


-- Read some products (R in CRUD - Read)
SELECT * FROM products;