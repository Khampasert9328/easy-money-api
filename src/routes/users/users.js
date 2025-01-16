const express = require('express');
const router = express.Router();
const auth  = require('../../controllers/users/users_controllers');

//route
router.post('/registers', auth.registerUser);
router.post('/login', auth.login);
module.exports = router;
