const validator = require('../helpers/validate');

const createBook = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    author: 'required|string',
    genre: 'required|string',
    year_published: 'required|integer',
    num_pages: 'required|integer',
    best_seller: 'required|boolean',
    location: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).json({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const updateBook = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    author: 'required|string',
    genre: 'required|string',
    year_published: 'required|integer',
    num_pages: 'required|integer',
    best_seller: 'required|boolean',
    location: 'required|string',
    availability: 'required|boolean'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).json({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const createUser = (req, res, next) => {
  const validationRule = {
    first_name: 'required|string',
    last_name: 'required|string',
    phone_number: 'required|string',
    member_since: 'required|integer'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).json({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const updateUser = (req, res, next) => {
  const validationRule = {
    first_name: 'required|string',
    last_name: 'required|string',
    phone_number: 'required|string',
    member_since: 'required|integer',
    books_checked_out: 'required|array'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).json({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  createBook,
  updateBook,
  createUser,
  updateUser
};
