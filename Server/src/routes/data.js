const express = require('express');
const route = express.Router();

const owner = require('../database/schema/carOwner');
const dealer = require('../database/schema/dealer');
const bid = require('../database/schema/bid');

route.get('/owner/:email', async(req, res)=>{
	try{
		const ownerdata = await owner.findOne({email: req.params['email']});
		res.status(201).json(ownerdata.carsSelled);
	}
	catch(error){
		console.log(error);
	}
});


route.get('/dealer/:email', async(req, res)=>{
	try{
		const dealerdata = await dealer.findOne({email: req.params['email']});
		res.status(201).json(dealerdata.carsPurchased);
	}	
	catch(error){
		console.log(error);
	}
});

module.exports = route;
