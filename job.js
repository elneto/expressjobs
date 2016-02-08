var mongoose = require('mongoose');
var Category = require('./category');

var jobSchema = {
  title: { type: String, required: true },
  // links must start with "http://"
  link: { type: String, match: /^http:\/\//i },
  agency: { type: String, required: true },
  position: { type: String},
  location: { type: String},
  deadline: { type: String},
  description: { type: String},
  category: Category.categorySchema,
};

var schema = new mongoose.Schema(jobSchema);

schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

module.exports = schema;
module.exports.jobSchema = jobSchema;
