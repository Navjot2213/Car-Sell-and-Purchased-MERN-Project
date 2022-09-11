const mongoose = require('mongoose');

const owner = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: String,
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	
	carsSelled: []
});

module.exports = mongoose.model('Owners', owner);
