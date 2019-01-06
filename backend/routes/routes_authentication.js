const express = require('express');
const router = express.Router();
const ctrlAuth = require('../controllers/ctrl_authentication');
const auth = ctrlAuth.auth

// (POST) /api/register - to handle new users registering
router.post('/register', ctrlAuth.register);

// (POST) /api/login - to handle returning users logging in
router.post('/login', ctrlAuth.login);

// (GET) /api/profile/USERID - to return profile xetails when given a USERID
router.get('/user/profile', auth, ctrlAuth.getProfile);

module.exports = router;
