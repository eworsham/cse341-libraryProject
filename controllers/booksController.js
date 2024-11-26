const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId

const getAll = async (req, res) => {
    //#swagger.tags=['Books']
    const result = await mongodb.getDatabase().db().collection('books').find()
    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(books)
    })
}

const getById = async (req, res) => {
    //#swagger.tags=['Books']
    const bookId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db().collection('books').find({ _id: bookId })
    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(books)
    })
}

module.exports = {
    getAll,
    getById
}