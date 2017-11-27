import chai from 'chai';
import server from '../server/index';
import userObject from '../server/helpers/Users';

const request = require('supertest');

const expect = chai.expect;

describe('userobject function', () => {
  request(server);
  const groupId = '-Kz88CmQ2lVYBlA4c5Mv';
  const groupName = 'my book';
  it('should expect to retun true if group id exist', (done) => {
    userObject.userGroup(groupId).then((res) => {
      expect(res).to.be.equal(true);
      done();
    });
  });
  it('should expect to return true if group name exist', (done) => {
    userObject.userGroupName(groupName).then((res) => {
      expect(res).to.be.equal(true);
      done();
    });
  });
  it('should expect the type to  userGroupName be a function', () => {
    expect(userObject.userGroupName).to.be.a('function');
  });
  it('should expect the type to  getGroupMembersPhoneNumber be a function', () => {
    expect(userObject.getGroupMembersPhoneNumber).to.be.a('function');
  });
  it('should expect to return phonenum if groupid passed exist', (done) => {
    userObject.getGroupMembersPhoneNumber(groupId).then((res) => {
      expect(res).include(
      '2347035994817',
      '2347096335417',
      );
      done();
    });
  });
});
