const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId

const getAll = async (req, res) => {
    //#swagger.tags=['Users']
    const result = await mongodb.getDatabase().db().collection('users').find()
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(users)
    })
}

const getById = async (req, res) => {
    //#swagger.tags=['Users']
    const bookId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db().collection('users').find({ _id: bookId })
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(users)
    })
}

module.exports = {
    getAll,
    getById
}