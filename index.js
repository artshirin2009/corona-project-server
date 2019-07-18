const express = require('express')
const app = express();
var path = require('path');
const cors = require('cors');
const bodyParser=require("body-parser");

const userRoutes=require('./routes/user/routes');
const categoryRoutes=require('./routes/category/routes');
const productRoutes=require('./routes/product/routes');

require('./db/connection');

app.use(cors());


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public/category')));


let port = 3000
app.listen(port, function () {
  console.log(`Server is listening on port ${port}!`);
})


 app.use('/user', userRoutes);
 app.use('/category', categoryRoutes);
 app.use('/product', productRoutes);