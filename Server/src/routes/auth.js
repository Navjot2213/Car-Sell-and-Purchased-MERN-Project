const express = require('express');
const route = express.Router();

const owner = require('../database/schema/carOwner');
const dealer = require('../database/schema/dealer');

route.post('/login', async (req, res) => {
	try{
		let user;
		if (req.body.dealer == "Dealer") {
			user = await dealer.findOne({email: req.body.email});
		}
		else {
			user = await owner.findOne({email: req.body.email});
		}
		if(!user || user.password != req.body.password){
			res.status(401).json({message: "user not found"});
		}
		else res.status(201).json({message: "Success", dealer: (req.body.dealer== "Dealer"?true:false)});
	}
	catch(error){
		console.log(error);
	}
});

route.post('/register', async (req, res) =>{
	try{
		let user, newUser;
		const {firstName, lastName, email, password,} = req.body;
		if (req.body.dealer == "Dealer") {
			user = await dealer.findOne({email: email});
			newUser = new dealer({firstName, lastName, email, password});
		}
		else {
			user = await owner.findOne({email: email});
			newUser = new owner({firstName, lastName, email, password});
		}
		
		console.log(user)
		if(user){
			res.status(411).json({message: "user already exists"});
		}
		else{
			try{ 
				await newUser.save(); 
				res.status(201).json({message: "Success", dealer: (req.body.dealer== "Dealer"?true:false)});
			}
			catch(err){ 
				res.status(402).json({error: err})
			}
		}
	}
	catch(error){
		console.log(error);
	}
});


module.exports = route;
