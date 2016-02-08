var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner) {
  mongoose.connect('mongodb://localhost:27017/un');

  var Category =
    mongoose.model('Category', require('./category'), 'categories');
  var Job =
    mongoose.model('Job', require('./job'), 'jobs');
  /*var User =
    mongoose.model('User', require('./user'), 'users');*/

  var models = {
    Category: Category,
    Job: Job,
    //User: User
  };

  // To ensure DRY-ness, register factories in a loop
  _.each(models, function(value, key) {
    wagner.factory(key, function() {
      return value;
    });
  });

  return models;
};
