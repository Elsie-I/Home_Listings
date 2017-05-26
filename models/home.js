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



Home.findSpecific = (zipcode, city, pricemore, priceless, bedrooms) => {
  console.log('this is zipcode => ', zipcode);

  let newzipcode = zipcode;
  if (zipcode === "NULL") {
    newzipcode = null;
  }
  let newcity = city;
  if (city === "NULL") {
    newcity = null;
  }
  let newpricemore = pricemore;
  if (pricemore === "NULL") {
    newpricemore = null;
  }
  let newpriceless = priceless;
  if (priceless === "NULL") {
    newpriceless = null;
  }
  let newbedrooms = bedrooms;
  if (bedrooms === "NULL") {
    newbedrooms = null;
  }
  zipcode = Number(zipcode);
  return db.any(
    `
    SELECT * FROM homes 
    WHERE 
    ($1 IS NULL OR zipcode = $1)
    AND  
    ($2 IS NULL OR city = $2)
    AND  
    ($3 IS NULL OR price > $3)
    AND  
    ($4 IS NULL OR price < $4)
    AND  
    ($5::int IS NULL OR bedrooms = $5::int)
    `, [newzipcode, newcity, newpricemore, newpriceless, newbedrooms]
  )


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
      address = $1,
      zipcode = $2,
      city = $3,
      bedrooms = $4,
      price = $5,
      about = $6,
      img_url = $7
      WHERE id = $8
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