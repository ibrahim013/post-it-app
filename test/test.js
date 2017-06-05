const supertest = require('supertest');
const should = require('should');

const server = supertest.agent('http://localhost:3000');
describe('unit test for API routes', function(){
it ('should return home page', function(checked){
server
.get('/')
.expect('Content-type', /json/)
.expect(200)
.end(function(err,res){
	res.status.should.equal(200);
	res.body.error.should.equal(false);
	checked();

	});
});
});