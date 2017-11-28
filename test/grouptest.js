import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import server from '../server/index';

chai.should();
chai.use(chaiHttp);
const expect = chai.expect;

describe('PostIt Endpoints', () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/v1/user/signout')
      .end(() => {
        done();
      });
  });
  it('should respond with error message if user is not logged in', (done) => {
    chai
      .request(server)
      .post('/api/v1/group')
      .send({
        groupName: faker.company.companyName(),
        description: faker.name.findName(),
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message');
        expect(res.body.message).to.eql('you must  be loged in to do this');
        if (err) return done();
        done();
      });
  });
});
describe('PostIt Endpoints', () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/v1/user/signin')
      .send({
        email: 'musa@musa.com',
        password: '12345678',
      })
      .end(() => {
        done();
      });
  });
  it('should successfully create a user group', (done) => {
    chai
      .request(server)
      .post('/api/v1/group')
      .send({
        groupName: faker.company.companyName(),
        description: faker.name.findName(),
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message');
        expect(res.body.message).to.eql('group created Sucessfuly');
        if (err) return done();
        done();
      });
  });
});

describe('PostIt Endpoints', () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/v1/user/signin')
      .send({
        email: 'master@master.com',
        password: '12345678',
      })
      .end(() => {
        done();
      });
  });
  it('should not add an already existing member', (done) => {
    chai
      .request(server)
      .post('/api/v1/group/addmember')
      .send({
        groupName: 'Andela',
        displayName: 'musa',
        groupId: '-Kyp-XkkztVrWq8xyMMb',
      })
      .end((err, res) => {
        res.should.have.status(409);
        expect(res.body.message).to.eql('This user is already a member of this group');
        if (err) return done();
        done();
      });
  });
});
describe('PostIt Endpoints', () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/v1/user/signin')
      .send({
        email: 'master@master.com',
        password: '12345678',
      })
      .end(() => {
        done();
      });
  });
  it('should prompt a user that the user group already exits ', (done) => {
    chai
      .request(server)
      .post('/api/v1/group')
      .send({
        groupName: 'Female',
        description: 'for female',
      })
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.have.property('message');
        expect(res.body.message).to.eql('group name already exist');
        done();
      });
  });
});
describe('PostIt Endpoints', () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/v1/user/signin')
      .send({
        email: 'waleibrahim13@gmail.com',
        password: '12345678',
      })
      .end(() => {
        done();
      });
  });
  it('should prompt a user when a member is not found', (done) => {
    chai
      .request(server)
      .post('/api/v1/group/addmember')
      .send({
        groupName: 'Female',
        displayName: 'master 2',
        groupId: '-KyZaDwTtu6Ul-Lq4sNZ',
      })
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.eql('User not found');
        done();
      });
  });
});
describe('PostIt Endpoints', () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/v1/user/signin')
      .send({
        email: 'waleibrahim13@gmail.com',
        password: '12345678',
      })
      .end(() => {
        done();
      });
  });
  it('should get all group members', (done) => {
    chai
      .request(server)
      .get('/api/v1/group/-Kz88CmQ2lVYBlA4c5Mv/members')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.nested.property('members').eql([
          {
            memberId: '-KzHqmSfx3Ttn9_12umr',
            displayName: 'master',
            email: 'waleibrahim13@gmail.com',
          },
          {
            memberId: '-KzHxMwhuHqiV3UKvDqM',
            displayName: 'admin',
            email: 'admin@admin.com',
          },
        ]);
        done();
      });
  });
});
describe('PostIt Endpoints', () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/v1/user/signin')
      .send({
        email: 'waleibrahim13@gmail.com',
        password: '12345678',
      })
      .end(() => {
        done();
      });
  });
  it('should not post a message if message field is empty', (done) => {
    chai
      .request(server)
      .post('/api/v1/group/postmessage')
      .send({
        groupName: 'Female',
        message: '',
        piority: 'Normal',
        groupId: '-KyZaDwTtu6Ul-Lq4sNZ',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.have.property('message');
        res.body.message.should.equal('message cant be empty');
        done();
      });
  });
});
describe('PostIt Endpoints', () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/v1/user/signin')
      .send({
        email: 'musa@musa.com',
        password: '12345678',
      })
      .end(() => {
        done();
      });
  });
  it('should not post a message if the group name field is empty', (done) => {
    chai
      .request(server)
      .post('/api/v1/group/postmessage')
      .send({
        groupName: '',
        message: 'hello',
        piority: 'Normal',
        groupId: '-KyZaDwTtu6Ul-Lq4sNZ',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.have.property('message');
        res.body.message.should.equal('group name cant be empty');
        done();
      });
  });
});

describe('PostIt Endpoints', () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/v1/user/signin')
      .send({
        email: 'musa@musa.com',
        password: '12345678',
      })
      .end(() => {
        done();
      });
  });
  it('should post a message to a user group successfully when a message is urgent', (done) => {
    chai
      .request(server)
      .post('/api/v1/group/postmessage')
      .send({
        groupName: 'Andela',
        message: 'hello world',
        piority: 'Urgent',
        groupId: '-Kyp-XkkztVrWq8xyMMb',
      })
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body.message).to.eql('Message Posted Sucessfuly');
        if (err) return done();
        done();
      });
  });
  it('should post a message to a user group successfully when a message is normal', (done) => {
    chai
      .request(server)
      .post('/api/v1/group/postmessage')
      .send({
        groupName: 'Andela',
        message: 'hello world',
        piority: 'Normal',
        groupId: '-Kyp-XkkztVrWq8xyMMb',
      })
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body.message).to.eql('Message Posted Sucessfuly');
        if (err) return done();
        done();
      });
  });
  it('should post a message to a user group successfully when a message is critical', (done) => {
    chai
      .request(server)
      .post('/api/v1/group/postmessage')
      .send({
        groupName: 'Andela',
        message: 'hello world',
        piority: 'Critical',
        groupId: '-Kyp-XkkztVrWq8xyMMb',
      })
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body.message).to.eql('Message Posted Sucessfuly');
        if (err) return done();
        done();
      });
  });
});

describe('PostIt Endpoint', () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/v1/user/signin')
      .send({
        email: 'waleibrahim13@gmail.com',
        password: '12345678',
      })
      .end(() => {
        done();
      });
  });
  it('should get all the messages in a user group', (done) => {
    const groupId = '-KyZaDwTtu6Ul-Lq4sNZ';
    chai
      .request(server)
      .get(`/api/v1/group/${groupId}/messages`)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body)
          .to.property('messages')
          .to.eql([
            {
              messageId: '-Kye23DNGwBdxfO7EYQ8',
              messageText: 'hello  all',
              author: 'master',
              priorityLevel: 'Normal',
              date: '11/11/2017, 8:47:32 AM',
            },
            {
              messageId: '-KypC5wehbBBOXWnUMak',
              messageText: 'hello all',
              author: 'Wale Ibrahim',
              priorityLevel: 'Urgent',
              date: '11/13/2017, 11:47:13 AM',
            },
            {
              messageId: '-KyvqgUZ3fYXMBG8aD3d',
              messageText: 'hello',
              author: 'Wale Ibrahim',
              priorityLevel: 'Normal',
              date: '2017-11-14 18:46:38',
            },
          ]);
        if (err) return done();
        done();
      });
  });
});
