var User = require('../../models/user');
var jwt = require('jsonwebtoken');


module.exports = {
  createUser: function (req, res) {
    const user = {
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.isAdmin
    }
    User.create(user).then(result => {
      let user = result.get();
      jwt.sign({
        user
      }, 'secretkey', {
        expiresIn: '24h'
      }, (err, token) => {
        res.json({
          user,
          token
        });
      });
    }).catch(err =>
      res.json(err)
    )
  },

  /** Login user */
  userLogin: function (req, res) {
    User.findOne({
        where: {
          email: req.body.email,
          password: req.body.password
        }
      })
      .then(user => {
        if (user == null) {
          throw 'wrong user';
        } else {
          jwt.sign({
            user
          }, 'secretkey', {
            expiresIn: '24h'
          }, (err, token) => {
            res.json({
              user,
              token
            });
          });
        }

      })
      .catch(error => res.status(400).json(error))
  },

  getAll: function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        throw err;
      }
      
      if (authData.user.isAdmin){
        User.findAll()
        .then(data => {
          res.json(data)
        })
        .catch(error =>{
          res.status(403).json(error)
        }
          )
      }
      else {
        res.status(403).json(error)
      }
    });
  },

  getOne: function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        throw err;
      }
      User.findOne({
          where: {
            id: req.params.id
          }
        }).then(data => {
          res.json(data)
        })
        .catch(err =>
          res.status(403).json(error)
        )
    });
  },

  update: function (req, res) {

    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        throw err;
      }
      let userToUpdate = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      };
      if (req.file) {
        userToUpdate.image = req.file.path.slice(16)
      }
      User.update(userToUpdate, {
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
    });



  },

  deleteOne: function (req, res) {
    User.destroy({
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
}