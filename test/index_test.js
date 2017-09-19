'use strict';

let request = require('supertest')
let server = 'parseInt(process.env.PORT, 10) || 3000';
let should = require("should");

describe('/GET', () => {
	it('should respond with a 404',(done)=>{
		request(server)
		.get('/dummy/path')
		.expect(404)
			done();
		})
	})

describe('/GET', () => {
	it('should respond with index path',(done)=>{
		request(server)
		.get('/')
		.expect(200)
		 done();
			
		})
	})

describe('/POST', () => {
	it('should respond with signin route',(done)=>{
		request(server)
		.post('/user/signin')
		.expect(200)
		 done();
			
		})
	})
describe('/GET', () => {
	it('should respond with dashboard',(done)=>{
		request(server)
		.get('/dashboard')
		.expect(200)
		 done();
			
		})
	})
	