
import assert from 'assert';
import faker from 'faker';
import chai from 'chai';
// import server from '../server/index'

const request = require('supertest');

const server = 'parseInt(process.env.PORT, 10) || 3000';
const should = require('should');


describe('/GET', () => {
  it('should respond with a 404', (done) => {
    request(server)
      .get('/dummy/path')
      .expect(404);
    done();
  });
});

describe('/GET', () => {
  it('should respond with index path', (done) => {
    request(server)
      .get('/')
      .expect(200);
    done();
  });
});

describe('/POST', () => {
  it('should respond with signin route', (done) => {
    request(server)
      .post('/user/signin')
      .expect(200);
	 done();
  });
});
describe('/GET', () => {
  it('should respond with dashboard', (done) => {
    request(server)
      .get('/dashboard')
      .expect(200);
    done();
  });
});
describe('/user/signup', () => {
  it('should allow new user`s to signup', (done) => {
    const newUser = {
      email: faker.internet.email(),
      password: 'kawthar',
      confirmPassword: 'kawthar',
      username: faker.name.findName()
    };
    chai.request(server)
      .post('/user/signup')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal('signup successful', res.body.message);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('response');
        res.body.should.be.a('object');
        done();
      });
  });
});

