// requiring all necessary node modules
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const models = require('./models');


// logging middleware
//morgan('tiny');

// will automatically parse the request body
app.use(bodyParser.urlencoded({extended: false})); // for HTML form submits
app.use(bodyParser.json());	 // for AJAX requests

// nunjucks boilerplate for rendering
nunjucks.configure('views', {noCache: true}); // where to find the views
app.set('view engine', 'html'); // specify file extension they have
app.engine('html', nunjucks.render); // how to render html templates

// serve up static files from a public folder
app.use(express.static('public'));

// app.use(express.static('node_modules'));
var routes = require('./routes');
app.use('/', routes);

models.db.sync(/*{force: true}*/)
.then(function() {
	console.log('Database has synced!');
	app.listen(3000, function() {
		console.log('Server listening on port 3000!');
	});
})
.catch(console.error);
