var express = require('express');
var status = require('http-status');

module.exports = function(wagner) {
  var api = express.Router();

  api.get('/jobs', wagner.invoke(function(Job) {
    return function(req, res) {
      Job.
        find().
        exec(handleMany.bind(null, 'jobs', res));
    };
  }));

  api.get('/job/id/:id', wagner.invoke(function(Job) {
    return function(req, res) {
      Job.findOne({ _id: req.params.id },
        handleOne.bind(null, 'job', res));
    };
  }));
  
  return api;
};

function handleOne(property, res, error, result) {
  if (error) {
    return res.
      status(status.INTERNAL_SERVER_ERROR).
      json({ error: error.toString() });
  }
  if (!result) {
    return res.
      status(status.NOT_FOUND).
      json({ error: 'Not found' });
  }

  var json = {};
  json[property] = result;
  res.json(json);
}

function handleMany(property, res, error, result) {
  if (error) {
    return res.
      status(status.INTERNAL_SERVER_ERROR).
      json({ error: error.toString() });
  }

  var json = {};
  json[property] = result;
  res.json(json);
}
