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
      res.status(400).json({message: '400', err});
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
      res.status(400).json({message: '400', err});
    });
};

homesController.create = (req, res) => {
  Home.create({
      home: req.body.home,
    })
    .then(home => {
      res.json({message: 'ok', data: { home }});
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({message: '400', err});
    });
};

homesController.update = (req, res) => {
  Home.update({
    home: req.body.home,
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
      res.json({message: 'home deleted'});
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
};

module.exports = homesController;