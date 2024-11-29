const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const checkoutBook = async (req, res) => {
  try {
    //#swagger.tags=['Library Processes']
    if (!ObjectId.isValid(req.body.userId)) {
      res.status(400).json({ message: 'Must use a valid user id for user to checkout book' });
    }
    if (!ObjectId.isValid(req.body.bookId)) {
      res.status(400).json({ message: 'Must use a valid book id for user to checkout book' });
    }
    const userId = new ObjectId(req.body.userId);
    const bookId = new ObjectId(req.body.bookId);

    // Get user by id
    const userResult = await mongodb.getDatabase().db().collection('users').find({ _id: userId });
    let user = (await userResult.toArray())[0];

    // Get book by id
    const bookResult = await mongodb.getDatabase().db().collection('books').find({ _id: bookId });
    let book = (await bookResult.toArray())[0];

    // Check if book is already checked out
    if (!book.availability) {
      throw new Error('Book is not available');
    }

    // Update user
    let booksCheckoutOutArray = user.books_checked_out;
    booksCheckoutOutArray.push({
      book_id: bookId.toString()
    });
    user.books_checked_out = booksCheckoutOutArray;
    const userUpdateResult = await mongodb
      .getDatabase()
      .db()
      .collection('users')
      .replaceOne({ _id: userId }, user);
    if (!userUpdateResult.modifiedCount > 0) {
      throw new Error('Some error occurred while updating the user checked out books');
    }

    // Update book
    book.availability = false;
    const bookUpdateResult = await mongodb
      .getDatabase()
      .db()
      .collection('books')
      .replaceOne({ _id: bookId }, book);
    if (!bookUpdateResult.modifiedCount > 0) {
      throw new Error('Some error occurred while updating the book availability');
    }

    // Checkout was successful
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const returnBook = async (req, res) => {
  try {
    //#swagger.tags=['Library Processes']
    if (!ObjectId.isValid(req.body.userId)) {
      res.status(400).json({ message: 'Must use a valid user id for user to return book' });
    }
    if (!ObjectId.isValid(req.body.bookId)) {
      res.status(400).json({ message: 'Must use a valid book id for user to return book' });
    }
    const userId = new ObjectId(req.body.userId);
    const bookId = new ObjectId(req.body.bookId);

    // Get user by id
    const userResult = await mongodb.getDatabase().db().collection('users').find({ _id: userId });
    let user = (await userResult.toArray())[0];

    // Get book by id
    const bookResult = await mongodb.getDatabase().db().collection('books').find({ _id: bookId });
    let book = (await bookResult.toArray())[0];

    // Check that book is checked out by user
    if (book.availability) {
      throw new Error('Book is not currently checked out');
    }
    if (!user.books_checked_out.find((book) => book.book_id == bookId)) {
      throw new Error('Book is not currently checked out by the user');
    }

    // Update user
    let booksCheckoutOutArray = user.books_checked_out;
    user.books_checked_out = booksCheckoutOutArray.filter((book) => book.book_id != bookId);
    const userUpdateResult = await mongodb
      .getDatabase()
      .db()
      .collection('users')
      .replaceOne({ _id: userId }, user);
    if (!userUpdateResult.modifiedCount > 0) {
      throw new Error('Some error occurred while updating the user checked out books');
    }

    // Update book
    book.availability = true;
    const bookUpdateResult = await mongodb
      .getDatabase()
      .db()
      .collection('books')
      .replaceOne({ _id: bookId }, book);
    if (!bookUpdateResult.modifiedCount > 0) {
      throw new Error('Some error occurred while updating the book availability');
    }

    // Checkout was successful
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {
  checkoutBook,
  returnBook
};
