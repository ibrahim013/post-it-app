import Nexmo from 'nexmo';
import * as dotenv from 'dotenv';

dotenv.load();
/**
 * @description: This module sends sms notification message to all users
 * in a group
 *
 * @param {object} smsobject
 *
 * @return {void}
 *
 */
const nexmo = new Nexmo({
  apiKey: process.env.SMS_API_KEY,
  apiSecret: process.env.SMS_API_SECRET,
});
module.exports = (smsObject) => {
  nexmo.message.sendSms(
    'Post-It App', smsObject.userNumber,
    `A critical message has been posted to ${smsObject.groupName}
     group you belong login in to view message`,
  );
};
