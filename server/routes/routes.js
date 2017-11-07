import express from 'express';
import User from '../controllers/UserController';
import {
  userGroups,
  addMember,
  postMessage,
  messageList,
  group,
  groupMember,
} from '../controllers/GroupController';
import Validator from '../helpers/Validator';

const router = express.Router();

router.post('/api/v1/user/signup', Validator.validateSignUp, User.signUp);
router.post('/api/v1/user/signin', Validator.validateSignIn, User.signIn);
router.post('/api/v1/user/google', User.googleLogin);
router.post('/api/v1/user/googleupdate', Validator.validateGoogleUpdate, User.googleUpdate);
router.get('/api/v1/user/signout', User.signOut);
router.post('/api/v1/user/passwordreset', Validator.validatePasswordReset, User.passwordReset);
router.post('/api/v1/group', group);
router.get('/api/v1/group/groups', userGroups);
router.post('/api/v1/group/addmember', addMember);
router.post('/api/v1/group/postmessage', postMessage);
router.get('/api/v1/group/:groupid/messages', messageList);
router.get('/api/v1/group/:groupid/members', groupMember);

export default router;
