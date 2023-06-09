const express = require('express');
const { check } = require('express-validator');
const userController = require('../Controllers/farmer_controller');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post(
  '/signup',
  [
    check('email').normalizeEmail().isEmail(), // normalizeEmail() => convert email to lowercase
    check('password').not().isEmpty().isLength({ min: 8 }),
    check('name').not().isEmpty(),
    check('address').not().isEmpty(),
    check('phone').not().isEmpty(),
  ],
  userController.signup
);

router.use(checkAuth); // if the user is not authenticated, the following routes will not be executed

router.get("/profile/:uid", userController.getUserById);

router.patch(
  '/:uid',
  [
    check('name').not().isEmpty(),
    check('address').not().isEmpty(),
    check('phone').not().isEmpty(),
  ],
  userController.updateUser
);

router.delete('/:uid', userController.deleteUser);

module.exports = router;
