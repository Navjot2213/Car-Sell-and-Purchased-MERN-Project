const express = require('express');
const route = express.Router();

const owner = require('../database/schema/carOwner');
const dealer = require('../database/schema/dealer');
const bid = require('../database/schema/bid');


route.post('/addPost',(req, res) =>{
	try{
		const {carModel, carDescription, carImage, startingBid, email} = req.body;
		const user = owner.findOne({email: email});
		if(!user){
			res.status(435).json({message: "error Occur"});
		}
		else{
			const bidPost = new bid({
				carModel: carModel, 
				carDescription: carDescription, 
				startingBid: startingBid, 
				carOwner: email,
				carImage: carImage,
				sold: false
			}); 
			bidPost.save();
			res.status(201).json({message: "Success"});
		}
	}
	catch(error){
		console.log(error);
	}
});


route.post('/make', async (req, res) =>{
	try{
		const {bidId, dealerBid, email} = req.body;
		const user = await dealer.findOne({email: email});
		if(!user){
			res.status(415).json({message: "error Occur"});
		}
		else{
			const bidDetail = await bid.findByIdAndUpdate(bidId, {$push: {dealerBids: [dealerBid, email] }});
			res.status(201).json({message: "Success", bidDetail});
		}
	}
	catch(error){
		console.log(error);
	}
});


route.get('/data', async (req, res) =>{
	try{
		const {email} = req.query;
		const bidDetail = await bid.find((!email?{sold: false}:{carOwner: email, sold: false}));
		res.status(201).json(bidDetail);
		}
	catch(error){
		console.log(error);
	}
});


route.post('/final', async (req, res) =>{
	try{
		const {bidId, dealerEmail, finalDeal, email} = req.body;		
		
		const finalbid = await bid.findByIdAndUpdate(bidId, 
			{sold: true, purchedBy: dealerEmail, finalDeal: finalDeal}
		);
		await owner.findOneAndUpdate({email: email}, 
			{$push: {carsSelled: {
				carDealer: dealerEmail,
				carModel: finalbid.carModel,
				carImage: finalbid.carImage,
				selledAt: finalDeal
			}}}
		);
		await dealer.findOneAndUpdate({email: dealerEmail},
			{$push: {carsPurchased: {
				carSeller: email,
				carModel: finalbid.carModel,
				carImage: finalbid.carImage,
				purchasedAt: finalDeal
			}}}
		)
		res.status(201).json({message: "Success"});
	}
	catch(error){
		console.log(error);
	}
});

module.exports = route;
