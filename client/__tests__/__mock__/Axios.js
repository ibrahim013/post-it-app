import LoginUser from './LoginUser.json';
import SignOut from './SignOut.json';
import ResetPassword from './ResetPassword.json';
import RegisterUser from './RegisterUser.json';
import GetNewUsers from './GetNewUser.json';
import AddUser from './AddUser.json';
import CreateGroup from './CreateGroup.json';
import Groups from './Groups.json';
import Message from './Message.json';
import AllGroupMembers from './GroupMembers.json';
import PostMessage from './PostMessage.json';

const mockApiCall = {
  post(url) {
    if (url === '/user/signup') {
      return Promise.resolve(RegisterUser);
    } else if (url === '/user/login') {
      return Promise.resolve(LoginUser);
    } else if (url === '/group') {
      return Promise.resolve(CreateGroup);
    } else if (url === '/group/groupId/user') {
      return Promise.resolve(AddUser);
    } else if (url === '/passwordreset') {
      return Promise.resolve(ResetPassword);
    } else if (url === '/signout') {
      return Promise.resolve(SignOut);
    }
    return Promise.resolve(PostMessage);
  },
  get(url) {
    if (url === '/groups/test/members') {
      return Promise.resolve(Message);
    } else if (url === '/group/test') {
      return Promise.resolve(GetNewUsers);
    } else if (url === '/user/allusers') {
      return Promise.resolve(AllGroupMembers);
    }
    return Promise.resolve(Groups);
  },
};
export default mockApiCall;
