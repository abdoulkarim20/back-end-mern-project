/*Importation module*/
const express = require('express');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config({
  path: './config/.env',
});
require('./config/db');
const { checkedUserConnected, requiredAuth } = require('./middleware/auth.middleware');
const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials:true,
  'allowedHeaders':['sessionId','Content-Type'],
  'exposedHeaders':['sessionId'],
  'methods':'GET,HEAD,PUT,PATCH,POST,DELETE',
  'prefligthContinue':false
}
/*--------------------------------------------------*/
/*Middlewere*/
app.use(cors(corsOptions))
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
const api = '/api/v1'
app.use(`${api}/users`, userRoutes);
app.use(`${api}/posts`, postRoutes)

/*--------------------------------------------------*/
/*Server*/
const port = process.env.PORT; /*Port du serveur*/
app.listen(port, () => {
  console.log(`server is started to port: ${port}`);
});
