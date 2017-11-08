import chai from 'chai';
import faker from 'faker';
import server from '../server/index';

const request = require('supertest');

const expect = chai.expect;


describe('Post It', () => {
  it('should sign up a new user', (done) => {
    const userTest = {
      displayName: 'user2',
      email: faker.internet.email(),
      password: '12345678',
      phoneNumber: '2347098776523',
    };
    request(server)
      .post('/v1/user/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send(userTest)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(200);
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('message');
        expect(res.body.message).to.be.equal('signup sucessful proceed to login');
        done();
      });
  });
  it('should return an error if email is empty', (done) => {
    const userTest = {
      displayName: 'user1',
      email: '',
      password: '12345678',

    };
    request(server)
      .post('/v1/user/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send(userTest)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(401);
        expect(res.statusCode).to.be.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('message');
        done();
      });
  });
  it('should return an error if email already exist', (done) => {
    const userTest = {
      displayName: 'user2',
      email: 'master@master.com',
      password: '12345678',
    };
    request(server)
      .post('/v1/user/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send(userTest)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(409);
        expect(res.statusCode).to.be.equal(409);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('message');
        expect(res.body.message).to.be.equal('email already in use');
        done();
      });
  });
  it('should send an error for bad input email', (done) => {
    const userTest = {
      displayName: 'user2',
      email: 'user2',
      password: '12345678',
    };
    request(server)
      .post('/v1/user/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .expect('Content-Type', /json/)
      .send(userTest)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('message');
        expect(res.body.message).to.be.equal('invalid email');
        done();
      });
  });
  it('should send an error for bad password input format', (done) => {
    const userTest = {
      displayName: 'user2',
      email: faker.internet.email(),
      password: '1234',
    };
    request(server)
      .post('/v1/user/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .expect('Content-Type', /json/)
      .send(userTest)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('message');
        expect(res.body.message).to.be.equal('password strength is too week');

        done();
      });
  });
  // Signin route
  it('should allow a registered user sign in successfully', (done) => {
    const registeredUser = {
      email: 'master@master.com',
      password: '12345678',
    };
    request(server)
      .post('/v1/user/signin')
      .set('Accept', 'application/x-www-form-urlencoded')
      .expect('Content-Type', /json/)
      .send(registeredUser)
      .end((err, res) => {
        expect(200);
        expect(res.statusCode).to.be.equal(200);
        // expect(res.body).to.be.an('object').to.have.keys('token');
        expect(res.body).to.have.a.property('message');
        // expect(res.body).to.have.a.property('token');
        expect(res.body.message).to.be.equal('Sign In Successful');
        done();
      });
  });
  it('should send an error for a wrong email', (done) => {
    const registeredUser = {
      email: 'user2',
      password: '123456',
    };
    request(server)
      .post('/v1/user/signin')
      .send(registeredUser)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('message');
        expect(res.body.message).to.be.equal('invalid email');
        done();
      });
  });
  // Password Reset
  it('should allow registered user`s to reset their passwords', (done) => {
    const userEmail = { email: 'waleibrahim13@gmail.com' };
    request(server)
      .post('/v1/user/passwordreset')
      .send(userEmail)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('should send an error for a wrongly formatted password', (done) => {
    const userEmail = { email: 'user.gmail.com' };
    request(server)
      .post('/v1/user/passwordreset')
      .send(userEmail)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        expect(res.body).to.have.a.property('message');
        expect(res.body.message).to.be.equal('invalid email');
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('should throw an error if email is not found', (done) => {
    const userEmail = { email: 'user@gmail.com' };
    request(server)
      .post('/v1/user/passwordreset')
      .send(userEmail)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        expect(res.body).to.have.a.property('message');
        expect(res.body.message).to.be.equal('user not found');
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('should respond with a 404', (done) => {
    request(server)
      .get('/dummy/path')
      .expect(404);
    done();
  });
  it('should respond with index path', (done) => {
    request(server)
      .get('/')
      .expect(200);
    done();
  });
  it('should respond with dashboard', (done) => {
    request(server)
      .get('/dashboard')
      .expect(200);
    done();
  });
  it('should respond with signin route', (done) => {
    request(server)
      .post('/v1/user/signin')
      .expect(200);
    done();
  });
});

