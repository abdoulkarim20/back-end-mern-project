const mongoose = require('mongoose');
mongoose
    .connect(
        "mongodb+srv://"+process.env.DB_USER_PASSWORD+"@cluster0.bxrkiow.mongodb.net/back-end-mern-project", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log(`Connected to server MongoDB`))
    .catch(error =>
        console.log(`Error for connected to server mongodb: ${error}`)
    );