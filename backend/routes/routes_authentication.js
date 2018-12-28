const express = require('express');
const router = express.Router();
const ctrlAuth = require('../controllers/ctrl_authentication');

// (POST) /api/register - to handle new users registering
router.post('/register', ctrlAuth.register);

// (POST) /api/login - to handle returning users logging in
router.post('/login', ctrlAuth.login);

// (GET) /api/profile/USERID - to return profile xetails when given a USERID
router.get('/profile', ctrlAuth.getProfile)

module.exports = router;
