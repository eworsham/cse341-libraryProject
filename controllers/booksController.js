const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Books']
  try {
    const result = await mongodb.getDatabase().db().collection('books').find();
    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books);
    });
  } catch (error) {
    res.status(500).json({ message: error })
  }
};

const getById = async (req, res) => {
  //#swagger.tags=['Books']
  try {
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('books').find({ _id: bookId });
    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books);
    });
  } catch (error) {
    res.status(500).json({ message: error })
  }
};

const createBook = async (req, res) => {
  //#swagger.tags=['Books']
  const book = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    year_published: req.body.year_published,
    num_pages: req.body.num_pages,
    best_seller: req.body.best_seller,
    location: req.body.location,
    availability: true
  };

  const result = await mongodb.getDatabase().db().collection('books').insertOne(book);

  if (result.acknowledged) {
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({
      id: result.insertedId
    });
  } else {
    res.status(500).json(result.error || 'Some error occurred while creating the book');
  }
};

const updateBook = async (req, res) => {
  //#swagger.tags=['Books']
  const bookId = new ObjectId(req.params.id);
  const book = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    year_published: req.body.year_published,
    num_pages: req.body.num_pages,
    best_seller: req.body.best_seller,
    location: req.body.location,
    availability: req.body.availability
  };

  const result = await mongodb
    .getDatabase()
    .db()
    .collection('books')
    .replaceOne({ _id: bookId }, book);

  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Some error occurred while updating the book');
  }
};

const deleteBook = async (req, res) => {
  //#swagger.tags=['Books']
  const bookId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('books').deleteOne({ _id: bookId });

  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Some error occurred while deleting the book');
  }
};

module.exports = {
  getAll,
  getById,
  createBook,
  updateBook,
  deleteBook
};
