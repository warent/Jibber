var mongoose = require('mongoose');

_jibberSchema = {
  jibber_id: mongoose.Schema.Types.ObjectId,
  parent_jibber_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
  user_id: Number,
  body: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}

_userSchema = {
  user_id: mongoose.Schema.Types.ObjectId,
  name: String
}

module.exports = {
  jibber: new mongoose.Schema(_jibberSchema),
  user: new mongoose.Schema(_userSchema)
};
