const mongooseConnect = require('./db/mongoConnect');

const productRoute = require('./routes/productRoute');
const supplierRoute = require('./routes/suppliersRoute');
const ordersRoute = require('./routes/ordersRoute');
const loginRoute = require('./routes/loginRoute');
const productStockRoute = require('./routes/productStockRoute');
const googleLoginRoute = require('./routes/googleLoginRoute');

const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());
  
app.use('/product', productRoute);
app.use('/supplier', supplierRoute);
app.use('/order', ordersRoute);
app.use('/login', loginRoute);
app.use('/productStock', productStockRoute);
app.use('/googleLogin', googleLoginRoute);

const port = process.env.POsupplierRoutesRT || 3000;

(async function() {
    try {
        await mongooseConnect();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
})();

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('An error in app, please try later.')
})

app.listen(port, () => {
    console.log(`app is listening at http://localhost:${port}`)
})
