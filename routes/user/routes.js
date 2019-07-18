var verifyToken = require('../../config/verifyToken');
var express = require('express')
var app = express();
var multerUpload = require('../../config/file-upload');
var route = require('./controller');

// Create
app.post('/', route.createUser  )

/**user Login */
app.post('/login', route.userLogin  )

// Read all
app.get('/', verifyToken, route.getAll ) 

// Read one
app.get('/:id', verifyToken, route.getOne)

// Update 
app.put('/:id', verifyToken, multerUpload.single('image'), route.update)

// Delete
app.delete('/:id', verifyToken, route.deleteOne)





module.exports = app;