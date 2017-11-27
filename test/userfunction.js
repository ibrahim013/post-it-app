import chai from 'chai';
import server from '../server/index';
import userObject from '../server/helpers/Users';

const request = require('supertest');

const expect = chai.expect;

describe('userobject function', () => {
  request(server);
  const groupId = '-Kyp-XkkztVrWq8xyMMb';
  const groupName = 'Andela';
  it('should expect to retun true if group id exist', (done) => {
    userObject.userGroup(groupId).then((res) => {
      expect(res).to.be.equal(true);
      done();
    });
  });
  it('should expect to retun true if group name exist', (done) => {
    userObject.userGroupName(groupName).then((res) => {
      expect(res).to.be.equal(true);
      done();
    });
  });
  it('should expect the type to  userGroupName be a function', () => {
    expect(userObject.userGroupName).to.be.a('function');
  });
  it('should expect the type to  getGroupMembersPhoneNumber be a function', () => {
    expect(userObject.userGroupName).to.be.a('function');
  });
  it('should expect to retun true if group name exist', (done) => {
    userObject.userGroupName(groupId).then((res) => {
      expect(res).to.be.equal(false);
      done();
    });
  });
});
