const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(users);
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getById = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).send({ message: 'Must use a valid user id to find a user' });
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId });
    result.toArray().then((users) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(users);
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const createUser = async (req, res) => {
  //#swagger.tags=['Users']
  const user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: req.body.phone_number,
    member_since: req.body.member_since,
    books_checked_out: []
  };

  const result = await mongodb.getDatabase().db().collection('users').insertOne(user);

  if (result.acknowledged) {
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({
      id: result.insertedId
    });
  } else {
    res.status(500).json(result.error || 'Some error occurred while creating the user');
  }
};

const updateUser = async (req, res) => {
  //#swagger.tags=['Users']
  /* #swagger.parameters['obj'] = {
        in: 'body',
        schema: { $ref: "#/definitions/CreateUser" }
    } */
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Must use a valid user id to update a user' });
  }
  const userId = new ObjectId(req.params.id);
  const user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: req.body.phone_number,
    member_since: req.body.member_since,
    books_checked_out: req.body.books_checked_out
  };

  const result = await mongodb
    .getDatabase()
    .db()
    .collection('users')
    .replaceOne({ _id: userId }, user);

  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Some error occurred while updating the user');
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags=['Users']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Must use a valid user id to delete a user' });
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });

  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Some error occurred while deleting the user');
  }
};

module.exports = {
  getAll,
  getById,
  createUser,
  updateUser,
  deleteUser
};
