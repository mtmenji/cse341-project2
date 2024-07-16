const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Books']
    mongodb
        .getDatabase()
        .db('project2')
        .collection('books')
        .find()
        .toArray()
        .then((books) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(books);
        })
        .catch((err) => {
            res.status(400).json({message: err});
        })
};

const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid book id to find a book.');
    }
    const bookId = new ObjectId(req.params.id);
    mongodb
    .getDatabase()
    .db('project2')
    .collection('books')
    .find({_id: bookId})
    .toArray()
    .then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books[0]);
    })
    .catch((err) => {
        res.status(400).json({message: err});
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
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid book id to update a book.');
    }

    const bookId = new ObjectId(req.params.id);
    const book = {
        title: req.body.title,
        author: req.body.author,
        publicationYear: req.body.publicationYear
    }
    const response = await mongodb.getDatabase().db('project2').collection('books').replaceOne({_id: bookId}, book);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the user.');
    }
}

const deleteBook = async (req, res) => {
    //#swagger.tags=['Books']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid book id to delete a book.');
    }
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