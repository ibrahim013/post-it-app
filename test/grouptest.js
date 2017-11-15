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
        email: 'musa@musa.com',
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
        email: 'musa@musa.com',
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
      .post('/api/v1/user/signin')
      .send({
        email: 'master@master.com',
        password: '12345678',
      })
      .end(() => {
        done();
      });
  });
  it('should respond with an error message when trying to add a user' +
   'who already exixt in the group', (done) => {
    chai.request(server)
      .post('/api/v1/group/addmember')
      .send({
        groupName: 'Female',
        displayName: 'master',
        groupId: '-KyZaDwTtu6Ul-Lq4sNZ',
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
      .post('/api/v1/user/signin')
      .send({
        email: 'master@master.com',
        password: '12345678',
      })
      .end(() => {
        done();
      });
  });
  it('should respond with an error message when trying to' +
  'add a group that already exist', (done) => {
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
        groupName: 'Female',
        displayName: 'master 2',
        groupId: '-KyZaDwTtu6Ul-Lq4sNZ',
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
  it('should respond with a success message when a right' +
   'id is passed to get group members', (done) => {
    chai.request(server)
      .get('/api/v1/group/-KyNFzcil6R-RNUJSoXS/members')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('members');
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
  it('should respond with an error message if no message is typed', (done) => {
    chai.request(server)
      .post('/api/v1/group/postmessage')
      .send({
        groupName: 'Female',
        message: '',
        piority: 'Normal',
        groupId: '-KyZaDwTtu6Ul-Lq4sNZ',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('message cant be empty');
        done();
      });
  });
});
describe('PostIt Endpoints', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v1/user/signin')
      .send({
        email: 'musa@musa.com',
        password: '12345678',
      })
      .end(() => {
        done();
      });
  });
  it('should respond with an error message if no group name is selected',
   (done) => {
     chai.request(server)
      .post('/api/v1/group/postmessage')
      .send({
        groupName: '',
        message: 'hello',
        piority: 'Normal',
        groupId: '-KyZaDwTtu6Ul-Lq4sNZ',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('group name cant be empty');
        done();
      });
   });
});
