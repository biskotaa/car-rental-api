const express = require('express');
const { connectDb } = require('./rent');
const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/cars');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/cars', carRoutes);

connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server runnign on localhost:${port}`)
    });
});