const express = require('express');
const router = express.Router();
const models = require('../models');
var Page = models.Page;
var User = models.User;
module.exports = router;


router.route('/')
.get(function(req, res) {
	Page.findAll()
	.then(function(pages) {
		res.render('index', {pages: pages});
	})
		//res.redirect('/');
	})
.post(function(req, res, next) {
	User.findOrCreate({
		where: {
			name: req.body.name,
			email: req.body.email
		}
	})
	.then(function(values) {
		var user = values[0];

		var page = Page.build({
			title: req.body.title,
			content: req.body.content,
			status: req.body.status
		});

		return page.save()
			.then(function(page) {
				return page.setAuthor(user);
			});
	})
	.then(function(newPage) {
		res.redirect('/wiki/' + newPage.urlTitle);
			// could also use res.redirect(savedPage.route);
		}).catch(next);
});

router.route('/add')
	.get(function(req, res) {
		res.render('addpage');
	});

router.route('/:urlTitle')
	.get(function(req, res, next) {
		Page.findOne({
			where: {
				urlTitle: req.params.urlTitle
			}, 
			include: [
				{model: User, as: 'author'}
			]
		})
		.then(function (page) {
    	// page instance will have a .author property
    	// as a filled in user object ({ name, email })
    		if (page === null) {
    			res.status(404).send();
    		} else {
    			res.render('wikipage', {page: page});
    		}
		}).catch(next);
	});