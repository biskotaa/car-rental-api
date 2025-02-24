const { MongoClient } = require('mongodb');
require('dotenv').config(); // Load environment variables from .env file

const client = new MongoClient(process.env.MONGO_URI);

let mongodb;

const connectDb = async () => {
    try {
        await client.connect();  // Connect to MongoDB
        mongodb = client.db('carRental');  // Assign to 'mongodb' after successful connection
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);  // Exit if connection fails
    }
};

// A getter function to safely access mongodb
const getDb = () => {
    if (!mongodb) {
        throw new Error('MongoDB not connected');
    }
    return mongodb;
};

module.exports = { connectDb, getDb };  // Export connectDb and getDb
