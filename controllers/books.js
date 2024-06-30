const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Books']
    mongodb
        .getDatabase()
        .db('project2')
        .collection('books')
        .find()
        .toArray((err, books) => {
            if (err) {
                res.status(400).json({message: err});
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(books);
        })
};

const getSingle = async (req, res) => {
    mongodb
    .getDatabase()
    .db('project2')
    .collection('books')
    .find()
    .toArray((err, books) => {
        if (err) {
            res.status(400).json({message: err});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books[0]);
    })
};

const createBook = async (req, res) => {
    //#swagger.tags=['Books']
    console.log(`Test: ${req.body}`);
    const book = {
        title: req.body.title,
        author: req.body.author,
        publicationYear: req.body.publicationYear
    };
    console.log('Received Book:', book); // Add this line to check the received book object

    const response = await mongodb.getDatabase().db('project2').collection('books').insertOne(book);
    if (response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating the user.');
    }
}

const updateBook = async (req, res) => {
    //#swagger.tags=['Books']
    const bookId = new ObjectId(req.params.id);
    const book = {
        title: req.body.title,
        author: req.body.author,
        publicationYear: req.body.publicationYear
    }
    const response = await mongodb.getDatabase().db('project2').collection('books').replaceOne({_id: bookId}, book);
    if (response.modificationCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the user.');
    }
}

const deleteBook = async (req, res) => {
    //#swagger.tags=['Books']
    const bookId = new ObjectId(req.params.id);
    const book = {
        title: req.body.title,
        author: req.body.author,
        publicationYear: req.body.publicationYear
    }
    const response = await mongodb.getDatabase().db('project2').collection('books').deleteOne({_id: bookId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting the user.');
    }
}

module.exports = {
    getAll,
    getSingle,
    createBook,
    updateBook,
    deleteBook
}