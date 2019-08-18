var CourseCategory = require('../../models/courseCategory')
var jwt = require('jsonwebtoken');

module.exports = {
  create: function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        throw err;
      }
      if (authData.user.isAdmin ){
        console.log('req--------------', req.files)
        const category = {
          title: req.body.title,
          image:req.files.image[0].path.slice(16),
          icon: req.files.icon[0].path.slice(16)
        }

        CourseCategory
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
    CourseCategory.findAll()
      .then(data => {
        console.log(__dirname)
        res.json(data)})
      .catch(error => 
        res.status(403).json(error))
  },

  getOne: function (req, res) {
    CourseCategory.findOne({
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
      CourseCategory.update(itemToUpdate, {
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
        CourseCategory.destroy({
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