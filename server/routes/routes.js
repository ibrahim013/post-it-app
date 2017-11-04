import express from 'express';
import {
  signUp,
  signIn,
  signOut,
  passwordReset,
  googleLogin,
  googleUpdate,
} from '../controllers/UserController';
import {
  userGroups,
  addMember,
  postMessage,
  messageList,
  group,
  groupMember,
} from '../controllers/GroupController';

const router = express.Router();

router.post('/api/v1/user/signup', signUp);
router.post('/api/v1/user/signin', signIn);
router.post('/api/v1/user/google', googleLogin);
router.post('/api/v1/user/googleupdate', googleUpdate);
router.get('/api/v1/user/signout', signOut);
router.post('/api/v1/user/passwordreset', passwordReset);
router.post('/api/v1/group', group);
router.get('/api/v1/group/groups', userGroups);
router.post('/api/v1/group/addmember', addMember);
router.post('/api/v1/group/postmessage', postMessage);
router.get('/api/v1/group/:groupid/messages', messageList);
router.get('/api/v1/group/:groupid/members', groupMember);

export default router;
