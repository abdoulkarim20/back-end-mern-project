const mongoose = require('mongoose');
mongoose
  .connect(
    'mongodb://localhost:27017/back-end-mern-project',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log(`Connected to server MongoDB`))
  .catch(error =>
    console.log(`Error for connected to server mongodb: ${error}`)
  );
/*Connexion a la base de donnees avec mongodb atlas*/
/*'mongodb+srv://' +
  process.env.DB_USER_PASSWORD +
  '@cluster0.bxrkiow.mongodb.net/back-end-mern-project',*/
