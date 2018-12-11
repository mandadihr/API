var mongoose = require('mongoose');

const userSchema = mongoose.Schema({
UserId: { type: Number},
FirstName: { type: String},
LastName: { type: String},
Password: { type: String},
Email: { type: String},
CreatedBy: { type: String},
UpdatedBy: { type: String},
ForgotPassword: { type: Boolean},
Attempts: { type: Number}
});

const user = mongoose.model('Users', userSchema, 'Users');
module.exports = user;