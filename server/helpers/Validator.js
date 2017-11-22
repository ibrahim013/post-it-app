
/**
 * @description: This middleware validates the input field of every route
 *
 * @class Validate
 */
export default class Validate {
/**
 * @description: validates the sign up route
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 *
 * @return {Object} response containing the validation status
 */
  static validateSignUp(req, res, next) {
    req.check('displayName', 'Username is required').notEmpty().matches(/\w/);
    req.check('phoneNumber', 'Phone number is required').notEmpty().matches(/\d/);
    req.check('phoneNumber', 'Only number is allowed here').isNumeric();
    req.check('email', 'Email is required').notEmpty();
    req.check('email', 'The email address is badly formatted').isEmail();
    req.check('password', 'Password is required').notEmpty();
    req.check('password', 'Password should be at least 6 characters')
        .isLength(6, 50);
    const errors = req.validationErrors();
    if (errors) {
      const message = errors[0].msg;
      res.status(400).json({ message });
    } else {
      next();
    }
  }
/**
 * @description: validates the sign in route
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 *
 * @return {Object} response containing the validation status
 */
  static validateSignIn(req, res, next) {
    req.check('email', 'Email is required').notEmpty();
    req.check('email', 'The email address is badly formatted.').isEmail();
    req.check('password', 'Password is empty').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
      const message = errors[0].msg;
      res.status(400).json({ message });
    } else {
      next();
    }
  }
/**
 * @description: validates the google update route
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 *
 * @return {Object} response containing the validation status
 */
  static validateGoogleUpdate(req, res, next) {
    req.check('phoneNumber', 'Phone number is required').notEmpty().matches(/\d/);
    const errors = req.validationErrors();
    if (errors) {
      const message = errors[0].msg;
      res.status(400).json({ message });
    } else {
      next();
    }
  }
/**
 * @description: validates the password reset route
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 *
 * @return {Object} response containing the validation status
 */
  static validatePasswordReset(req, res, next) {
    req.check('email', 'Email is required').notEmpty();
    req.check('email', 'The email address is badly formatted.').isEmail();
    const errors = req.validationErrors();
    if (errors) {
      const message = errors[0].msg;
      res.status(400).json({ message });
    } else {
      next();
    }
  }
/**
 * @description: validates the post message route
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 *
 * @return {Object} response containing the validation status
 */
  static validatePostMessage(req, res, next) {
    req.check('message', 'message cant be empty').notEmpty();
    req.check('piority', 'piority cant be empty').notEmpty();
    req.check('groupName', 'group name cant be empty').notEmpty();
    req.check('groupId', 'group id cant be empty').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
      const message = errors[0].msg;
      res.status(400).json({ message });
    } else {
      next();
    }
  }
/**
 * @description: validates the add group route
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 *
 * @return {Object} response containing the validation status
 */
  static validateAddGroup(req, res, next) {
    req.check('groupName', 'group name cant be empty').notEmpty();
    req.check('description', 'discription cant be empty.').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
      const message = errors[0].msg;
      res.status(400).json({ message });
    } else {
      next();
    }
  }
}
