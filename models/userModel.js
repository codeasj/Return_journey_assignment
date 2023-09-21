const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name : { type: String, required: true },
  phone: { type: String, required: true },
  ipAddress: { type: String, required: true }, // Add the ipAddress field
  createdAt: { type: Date, default: Date.now },
},
{
  timestamps: true
}
);

module.exports = mongoose.model('User', userSchema);