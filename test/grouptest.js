import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import server from '../server/index';

chai.should();
chai.use(chaiHttp);

chai.use(chaiHttp);
describe('PostIt Endpoints', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v1/user/signout')
      .end(() => {
        done();
      });
  });
  it('should respond with error message if user is not logged in', (done) => {
    chai.request(server)
      .post('/api/v1/group')
      .send({
        groupName: faker.company.companyName(),
        description: faker.name.findName(),
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
describe('PostIt Endpoints', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v1/user/signin')
      .send({
        email: 'waleibrahim13@gmail.com',
        password: '12345678',
      })
      .end(() => {
        done();
      });
  });
  it('should respond with success message if user is  logged in', (done) => {
    chai.request(server)
      .post('/api/v1/group')
      .send({
        groupName: faker.company.companyName(),
        description: faker.name.findName(),
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
describe('PostIt Endpoints', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v1/user/signin')
      .send({
        email: 'waleibrahim13@gmail.com',
        password: '12345678',
      })
      .end(() => {
        done();
      });
  });
  it('should respond with all avaliable groups a user belongs', (done) => {
    chai.request(server)
      .get('/api/v1/group/groups')
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.should.be.a('object');
        res.body.should.have.property('groups');
        done();
      });
  });
});
describe('PostIt Endpoints', () => {
  before((done) => {
    chai.request(server)
      .post('/v1/user/signin')
      .send({
        email: 'master@master.com',
        password: '12345678',
      })
      .end(() => {
        done();
      });
  });
  it('should respond with an error message when trying to add a user who already exixt in the group', (done) => {
    chai.request(server)
      .post('/api/v1/group/addmember')
      .send({
        groupName: 'Female',
        displayName: 'admin',
        groupId: '-KyNFzcil6R-RNUJSoXS',
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
describe('PostIt Endpoints', () => {
  before((done) => {
    chai.request(server)
      .post('/v1/user/signin')
      .send({
        email: 'master@master.com',
        password: '12345678',
      })
      .end(() => {
        done();
      });
  });
  it('should respond with an error message when trying to add a group that already exist', (done) => {
    chai.request(server)
      .post('/api/v1/group')
      .send({
        groupName: 'Female',
        description: 'for female',
      })
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('group name already exist');
        done();
      });
  });
});
describe('PostIt Endpoints', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v1/user/signin')
      .send({
        email: 'waleibrahim13@gmail.com',
        password: '12345678',
      })
      .end(() => {
        done();
      });
  });
  it('should respond with an error message for user not found', (done) => {
    chai.request(server)
      .post('/api/v1/group/addmember')
      .send({
        groupName: 'Andela Females',
        displayName: 'master 2',
        groupId: '-Kxj_WvDGOWx58m9VsYh',
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
describe('PostIt Endpoints', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v1/user/signin')
      .send({
        email: 'waleibrahim13@gmail.com',
        password: '12345678',
      })
      .end(() => {
        done();
      });
  });
  it('should respond with a success message when a right id is passed to get group members', (done) => {
    chai.request(server)
      .get('/api/v1/group/-KyNFzcil6R-RNUJSoXS/members')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.message.should.equal('members');
        done();
      });
  });
});
