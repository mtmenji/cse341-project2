const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(process.env.MONGODB_URL)
    .then(client => {
        console.log('Connected to the database');
        client.close();
    })
    .catch(err => {
        console.error('Failed to connect to the database:', err);
    });