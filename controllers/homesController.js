const Home = require('../models/home');

const homesController = {};

homesController.index = (req, res) => {
  Home.findAll()
    .then(homes => {
      res.json({
        message: 'ok',
        data: { homes },
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ message: '400', err });
    });
};

homesController.show = (req, res) => {
  Home.findById(req.params.id)
    .then(home => {
      res.json({
        message: 'ok',
        data: { home },
      }); 
    })
    .catch(err => {
      res.status(400).json({ message: '400', err });
    });
};

homesController.showSpecific = (req, res) => {
      console.log(req.params);

  Home.findSpecific(req.params.zipcode, req.params.price)
    .then(home => {
      res.json({
        message: 'ok',
        data: { home },
      });
    })
    .catch(err => {
      res.status(400).json({ message: '400', err });
    });
}; 


homesController.create = (req, res) => {
  Home.create({
    address: req.body.address,
    zipcode: req.body.zipcode,
    city: req.body.city,
    bedrooms: req.body.bedrooms,
    price: req.body.price,
    about: req.body.about,
    img_url: req.body.img_url,
  })
    .then(home => {
      res.json({ message: 'ok', data: { home } });
    }) 
    .catch(err => {
      console.log(err);
      res.status(400).json({ message: '400', err });
    }); 
};

homesController.update = (req, res) => {
  Home.update({
    address: req.body.address,
    zipcode: req.body.zipcode,
    city: req.body.city,
    bedrooms: req.body.bedrooms,
    price: req.body.price,
    about: req.body.about,
    img_url: req.body.img_url,
  }, req.params.id)
    .then(home => {
      res.json({
        message: 'ok',
        data: { home },
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
};

homesController.destroy = (req, res) => {
  Home.destroy(req.params.id)
    .then(() => {
      res.json({ message: 'home deleted' });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
};

module.exports = homesController;