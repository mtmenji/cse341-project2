const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Db is already initialized!');
        return callback (null, database);
    }
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            console.log('Successfully connected to the database.');
            database = client;
            callback(null, database);
        })
        .catch((err) => {
            console.log('Failed to connect to the database.');
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw Error('Database not initialized')
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase
}