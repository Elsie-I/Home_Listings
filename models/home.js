const db = require('../db/config');

const Home = {};

Home.findAll = () => {
  return db.query(
    `SELECT * FROM homes ORDER BY id DESC`
  );
}; 

Home.findById = (id) => {
  return db.oneOrNone(
    `
    SELECT * FROM homes
    WHERE id = $1`, 
    [id]
  );
};



Home.create = (home) => {
  return db.one(
    `
    INSERT INTO homes (address, zipcode, city, bedrooms, price)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [home.address, home.zipcode, home.city, home.bedrooms, home.price]
  );
};

Home.update = (home, id) => {
  return db.one(
    `
      UPDATE homes SET
      address = $1
      zipcode = $2
      city = $3
      bedrooms = $4
      price = $5
      WHERE id = $6
      RETURNING *
    `, [home.address, home.zipcode, home.city, home.bedrooms, home.price, id]
  );
};

Home.destroy = id => {
  return db.none(
    `
      DELETE FROM homes
      WHERE id = $1
    `, [id]
  );
};

module.exports = Home;