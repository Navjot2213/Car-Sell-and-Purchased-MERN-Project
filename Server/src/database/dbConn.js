const mongoose = require('mongoose');
const DBUrl = 'mongodb://127.0.0.1:27017/Project';

mongoose.connect(DBUrl, { 
	useNewUrlParser: true , 
	useUnifiedTopology: true 
	}).then(()=> {
		console.log(`Database Connected Successfully`);
	}).catch((error)=>{
		console.log(error);
	});
