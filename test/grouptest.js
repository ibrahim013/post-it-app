import chai from 'chai';
import server from '../server/index';

const request = require('supertest');

const expect = chai.expect;

describe('Post It', () => {
  // User's should be able to create grpoup
  it('should send an error for unregistered user`s when trying to create groups',
    (done) => {
      const group = { groupname: 'andela', discription: 'testing' };
      request(server)
        .post('/groups')
        .send(group)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(401);
          //   expect(res.body.message).to.be.equal('Group created succesfully');
          expect(res.body).to.have.property('message');
          //   expect(res.body).to.have.property('response');
          done();
        });
    });
});

