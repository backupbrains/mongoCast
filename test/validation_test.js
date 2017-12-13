const assert = require('assert');
const User = require('../src/user');

describe('validating records', () => {
	
	
	it('requires a user name', () => {	
		console.log('requires a user name')
		const user = new User({ name: undefined });
		console.log(user)
		const validationResult = user.validateSync();
		const { message } = validationResult.errors.name;
		assert(message === 'name is required');
	});
	
	
	it('require a user name longer than 2 characters', () => {
		const user = new User({name: 'al'});
		const validationResult = user.validateSync();
		const {message} = validationResult.errors.name;
		assert(message === 'name must be longer than 2 characters');
		
	});
	
	
	it('disallows invalid records form being saved', (done) => {
		const user = new User({name: 'al'});
		user.save().catch( (validationResult) => {
				const {message} = validationResult.errors.name;
				assert(message === 'name must be longer than 2 characters');
				done();
				
		})
	
	});
});