const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
	
	let joe;
	
	beforeEach((done) => {
		console.log('create joe in delte js')
		joe = new User({name: 'joe'});
		joe.save()
			.then(() => done());
	});
	
	it('model instance remove', (done) => {
		joe.remove()
			.then(() => User.findOne({name: 'joe'}))
			.then((user) => {
				assert(user === null);
				done();
			});
	});
	
	
	it('class method remove', (done) => {
		
		// remove a bunch of records with some given criteria
		User.remove()
			.then(() => User.findOne({name: 'joe'}))
			.then((user) => {
				assert(user === null);
				done();
			});
		
	});
	
	it('class method findAndRemove', (done) => {
		
		User.findOneAndRemove({name: 'joe'})
			.then(() => User.findOne({name: 'joe'}))
			.then((user) => {
				assert(user === null);
				done();
			});		
		
	});
	
	
	it('class method findAndRemove', (done) => {
		User.findByIdAndRemove(joe._id)
		.then(() => User.findOne({name: 'joe'}))
		.then((user) => {
			assert(user === null);
			done();
		});		
		
	});
	
});