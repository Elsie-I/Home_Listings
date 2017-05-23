-- \c home_listings_dev

DROP TABLE users;
DROP TABLE Homes; 

CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  phone_number VARCHAR(255),
  password TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS Homes (
  id BIGSERIAL PRIMARY KEY,
  address VARCHAR(1024),
  zipcode INTEGER,
  city VARCHAR(1024),
  bedrooms INTEGER,
  price INTEGER,
  about TEXT,
  img_url TEXT,
  user_id INTEGER REFERENCES users(id)
);

INSERT INTO homes (address, zipcode, city, bedrooms, price, about, img_url) VALUES 
  ('2345 coney island avenue', 11235, 'brooklyn', 2, 1500, 'this is good home', 'http://www.google.com/'),
  ('2778 beltparkway', 11228, 'queens', 3, 1100,'this is good home', 'http://www.google.com/'),
  ('8925 bath avenue', 22131, 'brooklyn', 4, 1400,'this is good home', 'http://www.google.com/'),
  ('9827 none avenue', 11298, 'manhattan', 5, 1200,'this is good home', 'http://www.google.com/');