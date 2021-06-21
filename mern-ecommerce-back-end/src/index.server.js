const express = require('express');
const app = express();
const env = require('dotenv');
const bodyparser = require('body-parser'); 
const mongoose =require('mongoose');

//enviroment variable or constant
env.config();

// mongoose connection
//mongodb+srv://nitinchoudhari:<password>@cluster0.5dzjw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose.connect(
    'mongodb+srv://nitinchoudhari:${process.env.mongo_db_password}@cluster0.5dzjw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }
).then( () => {
    console.log("Database connected...");
});

app.use(bodyparser());

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: "hello from server"
    });
});

app.post('/data', (req, res, next) => {
    res.status(200).json({
        message: req.body
    });
});

app.listen(process.env.PORT, () =>  {
    console.log('Server is running on port ',process.env.PORT);
}); 