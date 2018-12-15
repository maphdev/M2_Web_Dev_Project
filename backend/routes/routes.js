const express = require('express');
const router = express.Router();
const db = require('../model/db');

router.get('/', (req, res) => res.send('Hello World!'));

module.exports = router;
