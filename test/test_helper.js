const mongoose = require('mongoose');
mongoose.promise = global.Promise;

before((done) => {
	mongoose.connect('mongodb://localhost/users_test');
	mongoose.connection
		.once('open', () => {done();})
		.on('error', (error) => {
			console.warn('warning', error);
		});
})


beforeEach((done) => {
	mongoose.connection.collections.users.drop(() => {
		
		// ready to run the next test!
		done();	
	});
})	
	
	
	
	
	