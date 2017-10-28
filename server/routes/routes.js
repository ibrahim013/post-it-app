import express from 'express';
import { signUp, signIn, signOut, passwordReset, googleLogin, googleUpdate } from '../controllers/user';
import {
  userGroups,
  addMember,
  postMessage,
  messageList,
  group,
  groupMember,
} from '../controllers/group';

const router = express.Router();

router.post('/v1/user/signup', signUp);
router.post('/v1/user/signin', signIn);
router.post('/v1/user/google', googleLogin);
router.post('/v1/user/googleupdate', googleUpdate);
router.get('/v1/user/signout', signOut);
router.post('/v1/user/passwordreset', passwordReset);
router.post('/v1/group', group);
router.get('/v1/group/groups', userGroups);
router.post('/v1/group/addmember', addMember);
router.post('/v1/group/postmessage', postMessage);
router.get('/v1/group/:groupid/messages/', messageList);
router.get('/v1/group/:groupid/members/', groupMember);

export default router;
