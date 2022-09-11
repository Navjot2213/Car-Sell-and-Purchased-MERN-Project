const mongoose = require('mongoose');

const dealer = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: String,
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	
	carsPurchased: []
});

module.exports = mongoose.model('Dealers', dealer);
