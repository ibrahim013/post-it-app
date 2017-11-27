import chai from 'chai';
import faker from 'faker';
import server from '../server/index';
import userObject from '../server/helpers/Users';

const request = require('supertest');

const expect = chai.expect;


describe('PostIt Endpoints', () => {
  it('should respond with success message if correct details are supplied',
   (done) => {
     const userTest = {
       displayName: 'user2',
       email: faker.internet.email(),
       password: '12345678',
       phoneNumber: '2347098776523',
     };
     request(server)
      .post('/api/v1/user/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send(userTest)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(200);
        expect(res.statusCode).to.be.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('message');
        expect(res.body.message).to.be.equal('signup sucessful proceed to login');
        done();
      });
   });
  it('should respond with error message if email field is empty', (done) => {
    const userTest = {
      displayName: 'user1',
      email: '',
      password: '12345678',
      phoneNumber: '23478786534',

    };
    request(server)
      .post('/api/v1/user/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send(userTest)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(400);
        expect(res.statusCode).to.be.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('message');
        expect(res.body.message).to.be.equal('Email is required');

        done();
      });
  });
  it('should respond with error message if user is already registered',
  (done) => {
    const userTest = {
      displayName: 'user2',
      email: 'waleibrahim13@gmail.com',
      password: '12345678',
      phoneNumber: '2346756889314',
    };
    request(server)
      .post('/api/v1/user/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send(userTest)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(409);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('message');
        expect(res.body.message).to.be.equal('email already in use');
        done();
      });
  });
  it('should respond with error message for bad email input', (done) => {
    const userTest = {
      displayName: 'user2',
      email: 'user2@',
      password: '12345678',
      phoneNumber: '2346756889314',
    };
    request(server)
      .post('/api/v1/user/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .expect('Content-Type', /json/)
      .send(userTest)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('message');
        expect(res.body.message).to.be.equal(
          'The email address is badly formatted');
        done();
      });
  });
  it('should respond with error message for bad password input format',
  (done) => {
    const userTest = {
      displayName: 'user2',
      email: faker.internet.email(),
      password: '1234',
      phoneNumber: '2346756889314',
    };
    request(server)
      .post('/api/v1/user/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .expect('Content-Type', /json/)
      .send(userTest)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('message');
        expect(res.body.message).to.be.equal(
          'Password should be at least 6 characters');
        done();
      });
  });
  it('should respond with error message for empty phone number field',
   (done) => {
     const userTest = {
       displayName: 'user2',
       email: faker.internet.email(),
       password: ' 12345678',
       phoneNumber: ' ',
     };
     request(server)
      .post('/api/v1/user/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .expect('Content-Type', /json/)
      .send(userTest)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('message');
        expect(res.body.message).to.be.equal('Phone number is required');
        done();
      });
   });
  it('should respond with error message if phoneNumber is invalid', (done) => {
    const userTest = {
      displayName: 'user2',
      email: faker.internet.email(),
      password: ' 12345678',
      phoneNumber: ' 23456765656hjkd',
    };
    request(server)
      .post('/api/v1/user/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .expect('Content-Type', /json/)
      .send(userTest)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('message');
        expect(res.body.message).to.be.equal('Only number is allowed here');
        done();
      });
  });
  // Signin route
  it('should respond with success message if correct' +
  'email and password are supplied', (done) => {
    const registeredUser = {
      email: 'musa@musa.com',
      password: '12345678',
    };
    request(server)
      .post('/api/v1/user/signin')
      .set('Accept', 'application/x-www-form-urlencoded')
      .expect('Content-Type', /json/)
      .send(registeredUser)
      .end((err, res) => {
        expect(200);
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('user');
        expect(res.body).to.have.a.property('message');
        expect(res.body.message).to.be.equal('Sign In Successful');
        done();
      });
  });
  it('should respond with error message if email is not registered', (done) => {
    const registeredUser = {
      email: 'waleibrahim1@gmail.com',
      password: '12345678',
    };
    request(server)
      .post('/api/v1/user/signin')
      .set('Accept', 'application/x-www-form-urlencoded')
      .expect('Content-Type', /json/)
      .send(registeredUser)
      .end((err, res) => {
        expect(200);
        expect(res.statusCode).to.be.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('message');
        expect(res.body.message).to.be.equal(
          'user not found or account may have being disabled');
        done();
      });
  });
  it('should respond with error message if incorrect email is supplied',
  (done) => {
    const registeredUser = {
      email: 'user267@gmail.com',
      password: '123456',
    };
    request(server)
      .post('/api/v1/user/signin')
      .send(registeredUser)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('message');
        expect(res.body.message).to.be.equal(
          'user not found or account may have being disabled');
        done();
      });
  });
  it('should respond with error message if password is undefined', (done) => {
    const registeredUser = {
      email: 'user267@gmail.com',
      password: '',
    };
    request(server)
      .post('/api/v1/user/signin')
      .send(registeredUser)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('message');
        expect(res.body.message).to.be.equal('Password is empty');
        done();
      });
  });
  // Password Reset
  it('should respond with success message if correct email is supplied',
   (done) => {
     const userEmail = { email: 'waleibrahim13@gmail.com' };
     request(server)
      .post('/api/v1/user/passwordreset')
      .send(userEmail)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('message');
        expect(res.body.message).to.be.equal(
          'Password Reset Mail Sent to waleibrahim13@gmail.com');
        done();
      });
   });
  it('should respond with error message if wrongly formated email is supplied',
   (done) => {
     const userEmail = { email: 'user.gmail.com' };
     request(server)
      .post('/api/v1/user/passwordreset')
      .send(userEmail)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        expect(res.body).to.have.a.property('message');
        expect(res.body.message).to.be.equal(
          'The email address is badly formatted.');
        expect(res.body).to.be.an('object');
        done();
      });
   });
  it('should respond with error message if unregistered email is supplied',
  (done) => {
    const userEmail = { email: 'user@gmail.com' };
    request(server)
      .post('/api/v1/user/passwordreset')
      .send(userEmail)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        expect(res.body).to.have.a.property('message');
        expect(res.body.message).to.be.equal('user not found');
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
