const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  nak_user: {
    type: String,
    required: true
  },
  nak_pass: {
    type: String,
    required: true
  },
  api_key: {
    type: String,
    required: false
  }
});

mongoose.model('User', userSchema);
