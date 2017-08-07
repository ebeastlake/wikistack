const express = require('express');
const router = express.Router();
const models = require('../models');
var Page = models.Page;
var User = models.User;
module.exports = router;

router.route('/')
	.get(function(req, res, next) {
		User.findAll()
		.then(function(users) {
			res.render('users', {users: users});
		}).catch(next);
	});

router.route('/:id')
	.get(function(req, res, next) {
		var userPromise = User.findById(req.params.id);
		var pagesPromise = Page.findAll({
			where: {
				authorId: req.params.id
			}
		});
		Promise.all([userPromise, pagesPromise])
		.then(function(values) {
			var user = values[0];
			var pages = values[1];
			res.render('singleUser', {user: user, pages: pages});
		}).catch(next);
	});