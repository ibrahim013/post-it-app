import chai from 'chai';
import faker from 'faker';
import server from '../server/index';

const request = require('supertest');

const expect = chai.expect;


describe('Post It', () => {
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
      .post('/user/signin')
      .expect(200);
    done();
  });
  it('should sign up a new user', (done) => {
    const userTest = {
      displayName: 'user2',
      email: faker.internet.email(),
      password: '12345678',
    };
    request(server)
      .post('/user/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send(userTest)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(200);
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('message');
        expect(res.body.message).to.be.equal('signup sucessful');
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
      .post('/user/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send(userTest)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(401);
        expect(res.statusCode).to.be.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('message');
        done();
      });
  });
  it('should return an error if email already exist', (done) => {
    const userTest = {
      displayName: 'user2',
      email: 'user2@yahoo.com',
      password: '12345678',
    };
    request(server)
      .post('/user/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send(userTest)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(401);
        expect(res.statusCode).to.be.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('message');
        expect(res.body.message).to.be.equal('Somthing went wrong');
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
      .post('/user/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .expect('Content-Type', /json/)
      .send(userTest)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('message');
        expect(res.body.message).to.be.equal('Somthing went wrong');
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
      .post('/user/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .expect('Content-Type', /json/)
      .send(userTest)
      .end((err, res) => {
        expect(res.body.errorCode).to.be.equal('auth/weak-password');
        expect(res.statusCode).to.be.equal(401);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  // Signin route
  it('should allow a registered user sign in successfully', (done) => {
    const registeredUser = {
      email: 'admin@gmail.com',
      password: '123456',
    };
    request(server)
      .post('/user/signin')
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
      .post('/user/signin')
      .send(registeredUser)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.errorCode).to.be.equal('auth/invalid-email');
        expect(res.body.message).to.be.equal('Somthing went wrong');
        done();
      });
  });
  // Password Reset
  it('should allow registered user`s to reset their passwords', (done) => {
    const userEmail = { email: 'kawthar@gmail.com' };
    request(server)
      .post('/user/passwordreset')
      .send(userEmail)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(401);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('should send an error for a wrongly formatted password', (done) => {
    const userEmail = { email: 'user.gmail.com' };
    request(server)
      .post('/user/passwordreset')
      .send(userEmail)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(401);
        expect(res.body).to.have.a.property('errorCode');
        expect(res.body.errorCode).to.be.equal('The email address is badly formatted.');
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('should throw an error if email is not found', (done) => {
    const userEmail = { email: 'user@gmail.com' };
    request(server)
      .post('/user/passwordreset')
      .send(userEmail)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(401);
        expect(res.body.errorCode).to.be.equal('There is no user record corresponding ' +
          'to this identifier. The user may have been deleted.');
        expect(res.body.error).to.have.property('errorCode');
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

