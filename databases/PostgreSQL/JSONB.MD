An explanation of JSONB, B-tree, and GIN indexes in PostgreSQL:

### JSONB Data Type:
JSONB is a binary representation of JSON data in PostgreSQL. It stores JSON data in a compressed binary format, allowing for efficient storage and retrieval. JSONB supports indexing, making it suitable for storing and querying semi-structured data.

### B-tree Index on JSONB:
A B-tree index is a balanced tree data structure commonly used for indexing in relational databases. In PostgreSQL, you can create a B-tree index on a specific key within a JSONB column to optimize queries that filter or sort based on that key.

In the provided example, a B-tree index is created on the "brand" key within the JSONB column of the "products" table:
```sql
CREATE INDEX idx_product_details_brand ON products ((details->>'brand'));
```
This index allows for efficient retrieval of products based on their brand, improving query performance when filtering by brand.

### GIN Index on JSONB:
A GIN (Generalized Inverted Index) index is another type of index in PostgreSQL optimized for indexing composite types, arrays, and other data types that require full-text search or contain multiple values within a single column.

In the provided example, a GIN index is created on the entire JSONB column of the "products" table:
```sql
CREATE INDEX idx_product_details_gin ON products USING GIN (details);
```
This GIN index provides fast search capabilities for any key or value within the JSONB objects stored in the "details" column. It's suitable for a wide range of JSONB queries, including full-text search and queries involving multiple keys or values.

### SELECT Statement:
A SELECT statement is executed to retrieve all products where the brand is "Apple":
```sql
SELECT *
FROM products
WHERE details->>'brand' = 'Apple';
```
This query filters the products based on their brand using the `details->>'brand'` expression. Without indexes, the database may perform a sequential scan on the table, which could be less efficient, especially for larger datasets.

By creating B-tree and GIN indexes on the JSONB column, query performance can be significantly improved for filtering, sorting, and searching JSONB data in PostgreSQL.

### Demo:
```
-- Create the products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    details JSONB
);

-- Insert demo data into the products table
INSERT INTO products (details)
VALUES
    ('{"id": 1, "name": "Laptop", "brand": "Dell", "price": 1200}'::JSONB),
    ('{"id": 2, "name": "Smartphone", "brand": "Apple", "price": 1000}'::JSONB),
    ('{"id": 3, "name": "Tablet", "brand": "Samsung", "price": 800}'::JSONB),
    ('{"id": 4, "name": "Smartwatch", "brand": "Apple", "price": 300}'::JSONB),
    ('{"id": 5, "name": "Headphones", "brand": "Sony", "price": 150}'::JSONB),
    ('{"id": 6, "name": "Keyboard", "brand": "Logitech", "price": 50}'::JSONB);

-- Create a B-tree index on a specific key within the JSONB column
CREATE INDEX idx_product_details_brand ON products ((details->>'brand'));

-- Create a GIN index on the entire JSONB column
CREATE INDEX idx_product_details_gin ON products USING GIN (details);

-- SELECT statement 
SELECT *
FROM products
WHERE details->>'brand' = 'Apple';
```
