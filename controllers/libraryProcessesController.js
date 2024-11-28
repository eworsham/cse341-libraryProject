const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId

const checkoutBook = async (req, res) => {
    //#swagger.tags=['Library Processes']
    const userId = new ObjectId(req.body.userId)
    const bookId = new ObjectId(req.body.bookId)

    // Get user by id
    const userResult = await mongodb.getDatabase().db().collection('users').find({ _id: userId })
    let user = (await userResult.toArray())[0]

    // Get book by id
    const bookResult = await mongodb.getDatabase().db().collection('books').find({ _id: bookId })
    let book = (await bookResult.toArray())[0]

    // Update user

    // Update book
    book.availability = false
    const bookUpdateResult = await mongodb.getDatabase().db().collection('books').replaceOne({ _id: bookId }, book)

    
    res.status(200).json({
        "user result": user,
        "book result": book
    })
}

module.exports = {
    checkoutBook
}