\c home_listings_dev

CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  password TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS Homes (
  id BIGSERIAL PRIMARY KEY,
  address VARCHAR(1024),
  zipcode INTEGER,
  city VARCHAR(1024),
  bedrooms INTEGER,
  price INTEGER,
  user_id INTEGER REFERENCES users(id)
);