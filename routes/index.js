const express = require('express');
const router = express.Router();
const userRouter = require('./user.js');
const wikiRouter = require('./wiki.js');
module.exports = router;

router.use('/users', userRouter);
router.use('/wiki', wikiRouter);

router.route('/')
	.get(function(request, response) {
		response.set(200).json('This will be our webpage');
	});
