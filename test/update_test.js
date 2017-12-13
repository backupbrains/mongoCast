const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
	let joe;
	beforeEach((done) => {
		console.log('create joe in update js');
		joe = new User({name: 'joe', likes: 0});
		joe.save()
			.then(() => done())
	})
	
	function assertName(operation, done) {
		operation
		.then(() => User.find({}))
		.then((users) => {
			console.log(users);
			assert(users.length === 1);
			assert(users[0].name === 'alex');
			done();
		})
	}
	
	
	it('instance type using set n save', (done) => {
		joe.set('name', 'alex'); // only set in memory, not persist in the momery
		assertName(joe.save(), done)
		
	});
	
	it('a model instance can update', (done) => {
		assertName(joe.update({name: 'alex'}), done);
	});
	
	
	it('a model class can update', (done) => {
		assertName(
			User.update({name: 'joe'}, {name: 'alex'}),
			done
		);
	});
	
	it('a model class can update one record', (done) => {
		assertName(
			User.findOneAndUpdate({name: 'joe'}, {name: 'alex'}),
			done
		);
	});
	
	it('a model class can find a record with an id and update', (done) => {
		console.log(joe);
		assertName(
			User.findByIdAndUpdate(joe._id, {name: 'alex'}),
			done
		);
		
	});
	
	it('a user can have their likes incremented by 1', (done) => {
		User.update({ name: 'joe'}, {$inc: {likes: 1}})
			.then(() => User.findOne({name: 'joe'}))
			.then( (user)=>{
				assert(user.likes === 1);
				done();
			})
	});
	
	
})