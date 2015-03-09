'use strict';

var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
  taskBody: String,
  dateCreated: Date,
  dateDue: Date
});

module.exports = mongoose.model('Task', taskSchema);