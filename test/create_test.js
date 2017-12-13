const assert = require('assert');
const User = require('../src/user'); 

describe('Creating records', () => {
	it('saves a user', (done) => {
		console.log('create joe in create js')
		const joe = new User({name: 'joe'});
		joe.save()
			.then(() => {
				// has joe been saved successfully?
				assert(!joe.isNew);
				done();
			});
		
	});
	
});