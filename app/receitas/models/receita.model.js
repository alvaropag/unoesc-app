'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  
var ReceitaSchema = new Schema({
  brewery_id: {
    type: Schema.Types.ObjectId,
    turnOn: false,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  recipe: {
    type: String
  },
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date
  }
});

module.exports = mongoose.model('Receita', ReceitaSchema);

