var verifyToken = require('../../config/verifyToken');
var express = require('express')
var app = express();
var multerUpload = require('../../config/file-upload');
var route = require('./controller');

// Create
app.post('/',verifyToken,
multerUpload.fields([{
    name: 'icon', maxCount: 1
},{
    name: 'image', maxCount: 1
  }, 
  ]), route.create)

// Read all
app.get('/',  route.getAll)

// Read one
app.get('/:id', route.getOne)

// Update 
app.put('/:id',verifyToken, multerUpload.single('image'), route.update)

// Delete
app.delete('/:id',verifyToken, route.deleteOne)

module.exports = app;