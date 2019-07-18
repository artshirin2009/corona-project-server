var Product = require('../../models/product')
var jwt = require('jsonwebtoken');

module.exports = {
  create: function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        throw err;
      }
      if (authData.user.isAdmin ){
        const category = {
          categoryId: req.body.categoryId,
          title: req.body.title,
          image: req.file.path.slice(16)
        }
        Product
          .create(category)
          .then(result => {
          res.json(result.get())
          })
          .catch(err =>
          res.json(err)
        )
      }
      else{
        res.status(403).json('error')
      }
    });   
  },
  
  getAll: function (req, res) {
    Product.findAll()
      .then(data => {
        res.json(data)})
      .catch(error => 
        res.status(403).json(error))
  },

  getOne: function (req, res) {
    Product.findOne({
        where: {
          id: req.params.id
        }
      }).then(data => {
        res.json(data)
      })
      .catch(err =>
        res.json(err)
      )
  },

  update: function (req, res) {

    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        throw err;
      }

      if (authData.user.isAdmin){
        let itemToUpdate = {
        title: req.body.title
      };
      if (req.file) {
        itemToUpdate.image = req.file.path.slice(16)
      }
      Product.update(itemToUpdate, {
          where: {
            id: req.params.id
          }
        })
        .then(data => {
          
          res.json(data)
        })
        .catch(err =>
          res.status(403).json(error)
        )
      }
      else {
        res.status(403).json(error)
      }
    });

  },

  deleteOne: function (req, res) {

    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        throw err;
      }

      if (authData.user.isAdmin){
        Product.destroy({
          where: {
            id: req.params.id
          }
        })
        .then(data =>
          res.json(data)
        )
        .catch(err =>
          res.json(err)
        )
      }
      else {
        res.status(403).json(error)
      }
    });











    
  }
}