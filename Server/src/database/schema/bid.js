const mongoose = require('mongoose');

const bid = new mongoose.Schema({
	carOwner: {type: String, required: true},
	carModel: {type: String, required: true},
	carDescription: {type: String, required: true},
	carImage: {type: String, required: true},
	startingBid:{type: String, required: true},
	dealerBids: [],
	sold: {type: Boolean, default: false, required: true},
	purchedBy: String,
});

module.exports = mongoose.model('Bid', bid);
