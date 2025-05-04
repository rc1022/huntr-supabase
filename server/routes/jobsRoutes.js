const express = require('express');
const router = express.Router();
const jobsController = require('../controller/jobsController');
const userController = require('../controller/userController');
const authenticateToken = userController.authenticateToken;

// Jobs table API
router.get('/',authenticateToken, jobsController.getAllJobs);
router.post('/', authenticateToken, jobsController.addJob);
router.put('/:id', authenticateToken, jobsController.updateJob);
router.delete('/:id', authenticateToken, jobsController.deleteJob);

// Authentication API
router.post('/signup', userController.register);
router.post('/login', userController.login);
router.post('/refresh',userController.refresh);

module.exports = router;