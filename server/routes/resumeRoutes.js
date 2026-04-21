const express = require('express');
const {
  createResume,
  getResumes,
  getResume,
  updateResume,
  deleteResume,
} = require('../controllers/resumeController');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(auth);

router.route('/').post(createResume).get(getResumes);

router.route('/:id').get(getResume).put(updateResume).delete(deleteResume);

module.exports = router;
