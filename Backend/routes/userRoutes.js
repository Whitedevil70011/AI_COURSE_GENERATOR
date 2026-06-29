const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');

// GET /api/users/profile  — requires Authorization: Bearer <token>
router.get('/profile', getUserProfile);

module.exports = router;
