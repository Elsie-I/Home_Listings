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



Home.findSpecific = (zipcode, price) => {
  
  return db.oneOrNone(
    `
    SELECT * FROM homes
    WHERE zipcode = $1
    AND price < $2
    `,
    [zipcode, price]
  );
};


Home.create = (home) => {
  return db.one(
    `
    INSERT INTO homes (address, zipcode, city, bedrooms, price, about, img_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
    [home.address, home.zipcode, home.city, home.bedrooms, home.price, home.about, home.img_url]
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
      about = $6
      img_url = $7
      WHERE id = $6
      RETURNING *
    `, [home.address, home.zipcode, home.city, home.bedrooms, home.price, home.about, home.img_url, id]
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