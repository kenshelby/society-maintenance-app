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
router.get('/user/:userId', getUserFlats); // get flats of a specific user
router.post('/claim/:id', protect, claimFlat); // claim a flat

module.exports = router;