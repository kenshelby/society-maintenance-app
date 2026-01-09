const express = require("express");
const router = express.Router();
const {
  addFlat,
  getFlats,
  getUserFlats,
  claimFlat,
} = require('../controllers/flatController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', addFlat);                // add new flat
router.get('/', getFlats);                // list all flats (pagination)
router.get('/me', protect, getUserFlats); // for specific user //changed '/user/:userId'>>use it when admin changes to '/me'
router.post('/claim/:id', protect, claimFlat); // claim a flat

module.exports = router;