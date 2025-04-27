const express = require('express');
const router = express.Router();
const jobsController = require('../controller/jobsController');
const userController = require('../controller/userController');

// Jobs table API
router.get('/',jobsController.getAllJobs);
router.get('/:id',jobsController.getJob);
router.post('/',jobsController.addJob);
router.put('/:id',jobsController.updateJob);
router.delete('/:id',jobsController.deleteJob);

// Authentication API
router.post('/signup', userController.register);
router.post('/login', userController.login);

module.exports = router;