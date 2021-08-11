const express = require('express');
const app = express();
const env = require('dotenv'); 
const mongoose =require('mongoose');
const path = require('path');
const cors = require('cors');

const authroute = require('./routes/auth');
const adminroute = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const initialDataRoutes = require('./routes/initialData');
const pageRoutes = require('./routes/admin/page');
const addressRoutes = require('./routes/address');
const orderRoutes = require('./routes/order');

//enviroment variable or constant
env.config();

// mongoose connection
//mongodb+srv://nitinchoudhari:<password>@cluster0.5dzjw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose.connect(
    `mongodb+srv://${process.env.mongo_db_user}:${process.env.mongo_db_password}@cluster0.5dzjw.mongodb.net/${process.env.mongo_database}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }

).then( () => {
    console.log("Database connected...");
});

app.use(cors());
app.use(express.json());
//app.use(bodyparser());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api', authroute);
app.use('/api', adminroute);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', initialDataRoutes);
app.use('/api', pageRoutes);
app.use('/api', addressRoutes);
app.use('/api', orderRoutes);

app.listen(process.env.PORT, () =>  {
    console.log(`Server is running on port ${process.env.PORT}`);
}); 