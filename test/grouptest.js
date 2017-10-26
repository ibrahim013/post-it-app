import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import server from '../server/index';

chai.should();
chai.use(chaiHttp);

chai.use(chaiHttp);
describe('Create group route', () => {
  before((done) => {
    chai.request(server)
      .post('/v1/user/signout')
      .end(() => {
        done();
      });
  });
  it('should return 401 for users that are not logged in', (done) => {
    chai.request(server)
      .post('/v1/group')
      .send({
        groupname: faker.company.companyName(),
        discription: faker.name.findName(),
      })
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('you must  be loged in to do this');
        done();
      });
  });
});
describe('Create group route', () => {
  before((done) => {
    chai.request(server)
      .post('/v1/user/signin')
      .send({
        email: 'lot2come@yahoo.com',
        password: '12345678',
      })
      .end(() => {
        done();
      });
  });
  it('should return 201 for users that are logged in', (done) => {
    chai.request(server)
      .post('/v1/group')
      .send({
        groupname: faker.company.companyName(),
        discription: faker.name.findName(),
      })
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('group created Sucessfuly');
        done();
      });
  });
});
describe('Get group route', () => {
  before((done) => {
    chai.request(server)
      .post('/v1/user/signin')
      .send({
        email: 'lot2come@yahoo.com',
        password: '12345678',
      })
      .end(() => {
        done();
      });
  });
  it('should return list of groups', (done) => {
    chai.request(server)
      .get('/v1/group/groups')
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.should.be.a('object');
        res.body.should.have.property('groups');
        // res.body.message.should.equal('group created Sucessfuly');
        done();
      });
  });
});
describe('Add group route', () => {
  before((done) => {
    chai.request(server)
      .post('/v1/user/signin')
      .send({
        email: 'lot2come@yahoo.com',
        password: '12345678',
      })
      .end(() => {
        done();
      });
  });
  it('should return 400 for user already exist in group', (done) => {
    chai.request(server)
      .post('/v1/group/addmember')
      .send({
        groupName: 'final',
        displayName: 'admin',
        groupId: '-KwZbPxdoMHH71nB1F0S',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('This user is already a member of this group');
        done();
      });
  });
});
describe('Add group route', () => {
  before((done) => {
    chai.request(server)
      .post('/v1/user/signin')
      .send({
        email: 'lot2come@yahoo.com',
        password: '12345678',
      })
      .end(() => {
        done();
      });
  });
  it('should return 400 for user not found', (done) => {
    chai.request(server)
      .post('/v1/group/addmember')
      .send({
        groupName: 'final',
        displayName: 'master 2',
        groupId: '-KwZbPxdoMHH71nB1F0S',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('User not found');
        done();
      });
  });
});
describe('Add group route', () => {
  before((done) => {
    chai.request(server)
      .post('/v1/user/signin')
      .send({
        email: 'lot2come@yahoo.com',
        password: '12345678',
      })
      .end(() => {
        done();
      });
  });
  it('should return 400 for user not found', (done) => {
    chai.request(server)
      .post('/v1/group/addmember')
      .send({
        groupName: 'final2',
        displayName: 'master',
        groupId: '-KwZbPxdoMHH71nB1F0S',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('User not found');
        done();
      });
  });
});

