/*Importation module*/
const express = require('express');
const userRoutes=require('./routes/user.routes')
const bodyParser=require('body-parser');
require('dotenv').config({
  path: './config/.env',
});
require('./config/db');
const app = express();
/*--------------------------------------------------*/
/*Middlewere*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
/*--------------------------------------------------*/


/*Routes*/
app.use('/api/user',userRoutes);





/*--------------------------------------------------*/
/*Server*/
const port = process.env.PORT; /*Port du serveur*/
app.listen(port, () => {
  console.log(`server is started to port: ${port}`);
});
