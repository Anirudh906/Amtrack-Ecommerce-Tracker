const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  
    name: {
      type: String,
      required: true
  },
  password: {
      type: String,
      required: true
  },
  email: {
      type: String,
      requirted: true
  },
  products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'products'
  }
});
const User = mongoose.model('user', UserSchema)
module.exports = User 