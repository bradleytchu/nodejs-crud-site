let mongoose = require('mongoose');

// schema
let articleschema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  author: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true
  }
});

let Article = module.exports = mongoose.model('Article', articleschema);