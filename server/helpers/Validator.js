 /**
     * @description: validates the sign up
     *
     * @param {Object} req request object
     * @param {Object} res response object
     * @param {Function} next callback function
     *
     * @return {Object} response containing the validation status
     */

export default class Validate {
  static validateSignUp(req, res, next) {
    req.check('displayName', 'Username is required').notEmpty().matches(/\w/);
    req.check('phoneNumber', 'Phone number is required').notEmpty().matches(/\d/);
    req.check('email', 'Email is required').notEmpty();
    req.check('email', 'The email address is badly formatted.').isEmail();
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

  static validateSignIn(req, res, next) {
    req.check('email', 'Email is required').notEmpty();
    req.check('email', 'The email address is badly formatted.').isEmail();
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
}
