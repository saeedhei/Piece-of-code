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

-- SELECT statement before creating the index
SELECT *
FROM products
WHERE details->>'brand' = 'Apple';


