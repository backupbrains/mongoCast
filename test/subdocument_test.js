const assert = require('assert');
const User = require('../src/user');


describe('Subdocuments', () => {
	it('can create a subdocument', (done) => {
		const joe = new User({
			name: 'joe',
			posts: [{title: 'PostTitle'}]
		});
		
		joe.save()
			.then(() => User.findOne({name: 'joe'}))
			.then((user) => {
				assert(user.posts[0].title === 'PostTitle');
				done();
			})
		
	});
	
	
	it('can add subdocuments to an existing record', (done) => {
		const joe = new User({
			name: 'joe',
			posts:[]
		});
		
		joe.save()
			.then( () => User.findOne({name: 'joe'}))
			.then((user) => {
				user.posts.push({title: 'new post'});
				return user.save();
			})
			.then(() => User.findOne({name: 'joe'}))
			.then((user) => {
				assert(user.posts[0].title === 'new post');
				done();
			});
	});
	
	
	it('can remove an existing subdocument', (done) => {
		const joe = new User({
			name: 'joe',
			posts:[{title: 'new post'}]
		});
		
		joe.save()
			.then(() => User.findOne({ name: 'joe'}))
			.then((user) => {
				user.posts[0].remove();
				return user.save();
			})
			.then( () => User.findOne({ name: 'joe'}))
			.then( (user) => {
				assert(user.posts.length === 0);
				done();
			})
		
	})
	
});