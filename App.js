const express = require('express');
const {notFound , erroeHandler} = require('./middleware/errors');
require('./helpers/init_mongodb');
require("dotenv").config();

//init app
const app = express()


//apply middlewara
app.use(express.json());


//Routes
app.use("/api/books" , require('./Api/routes/books'));
app.use("/api/authors" , require('./Api/routes/authors'));
app.use("/api/auth" , require('./Api/routes/auth'));
app.use("/api/user" , require('./Api/routes/users'));

//Error Handler
app.use(notFound);
app.use(erroeHandler);

app.listen(process.env.PORT, () => {
    console.log(`app listening on port ${process.env.PORT}`)
})








