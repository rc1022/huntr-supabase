const express = require('express');
const router = express.Router();
const jobsController = require('../controller/jobsController')

router.get('/',jobsController.getAllJobs);
router.get('/:id',jobsController.getJob);

router.post('/',jobsController.addJob);

router.put('/:id',jobsController.updateJob);

router.delete('/:id',jobsController.deleteJob);

module.exports = router;