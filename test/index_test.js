import chai from 'chai';
import server from '../server/index';

const request = require('supertest');

const should = chai.should;
const expect = chai.expect;


describe('Pst Ito', () => {
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
      email: 'user2@yahoo.com',
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
        if (err) return done();
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
        expect(res.body.message).to.be.equal('Somthing went wrong');
        if (err) return done();
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
        if (err) return done();
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
        if (err) return done();
        done();
      });
  });
  it('should send an error for bad input format', (done) => {
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
        expect(res.body.error.message).to.equal('auth/weak-password', res.body.error.code);
        expect(res.statusCode).to.be.equal(502);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  // Signin route
  it('should allow a registered user sign in successfully', (done) => {
    const registeredUser = {
      email: 'user2@yahoo.com',
      password: '12345678',
    };
    request(server)
      .post('/user/signin')
      .set('Accept', 'application/x-www-form-urlencoded')
      .expect('Content-Type', /json/)
      .send(registeredUser)
      .end((err, res) => {
        expect(200);
        // expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('message');
        expect(res.body.message).to.be.equal('Sign In Successful', token);
        if (err) return done();
        done();
      });
  });
  it('should send an error for a wrong password', (done) => {
    const registeredUser = {
      email: 'user2@yahoo.com',
      password: '123456',
    };
    request(server)
      .post('/user/signin')
      .send(registeredUser)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.errorCode).to.be.equal('auth/wrong-password', res.body.error.code);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

