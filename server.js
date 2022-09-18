/*Importation module*/
const express = require('express');
const userRoutes = require('./routes/user.routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
require('dotenv').config({
  path: './config/.env',
});
require('./config/db');
const { checkedUserConnected, requiredAuth } = require('./middleware/auth.middleware');
const app = express();
/*--------------------------------------------------*/
/*Middlewere*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
/*--------------------------------------------------*/
/*JWT Routes*/
app.get('*', checkedUserConnected);
app.get('/jwtid', requiredAuth, (req, res) => {
  res.status(200).send(res.locals.user.id);
})

/*Routes*/
app.use('/api/users', userRoutes);

/*--------------------------------------------------*/
/*Server*/
const port = process.env.PORT; /*Port du serveur*/
app.listen(port, () => {
  console.log(`server is started to port: ${port}`);
});
