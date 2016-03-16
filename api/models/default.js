var mongoose = require('mongoose');
var schemas = require('../schemas/default.js');

module.exports = {
  jibber: mongoose.model('jibber', schemas.jibber)
};
