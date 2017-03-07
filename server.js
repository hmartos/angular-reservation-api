// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/reservation'); // connect to our database
var Bear     = require('./app/models/bear');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	//console.log('Something is happening.');
	//CORS
	res.header("Access-Control-Allow-Origin", "*"); //TODO Hector 05/02/2016 Configure CORS origins
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')

	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(function(req, res) {
		
		var bear = new Bear();		// create a new instance of the Bear model
		bear.name = req.body.name;  // set the bears name (comes from the request)

		bear.save(function(err) {
			if (err)
				res.send(err);
2
			res.json({ message: 'Bear created!' });
		});

		
	})

	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {
		Bear.find(function(err, bears) {
			if (err)
				res.send(err);

			res.json(bears);
		});
	});

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')

	// get the bear with that id
	.get(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
		});
	})

	// update the bear with this id
	.put(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {

			if (err)
				res.send(err);

			bear.name = req.body.name;
			bear.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Bear updated!' });
			});

		});
	})

	// delete the bear with this id
	.delete(function(req, res) {
		Bear.remove({
			_id: req.params.bear_id
		}, function(err, bear) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


// Reservation module routes
router.route('/getAvailableHours')

	//Get list of available hours for selected date
	.post(function(req, res) {
		/*Bear.findById(req.params.bear_id, function(err, bear) {
		 if (err)
		 res.send(err);
		 res.json(bear);
		 });*/
		//TODO Hector 05/02/2016 Buscar las horas disponibles para la fecha seleccionada en la base de datos
		var selectedDate = req.body.selectedDate;
		console.log("Selected date: " + selectedDate);

		//Hardcoded data
		var response = {};
		response.availableHours = ["10:00", "10.30", "11.30", "12.30", "13.00", "17.00", "17.30", "18.00", "18.30", "19.00"];
		//response.availableHours = [];
		response.level = "SUCCESS";
		response.message = "";
		res.json(response);
	})

router.route('/reserve')

	//Get list of available hours for selected date
	.post(function(req, res) {
		/*Bear.findById(req.params.bear_id, function(err, bear) {
		 if (err)
		 res.send(err);
		 res.json(bear);
		 });*/
		//TODO Hector 05/02/2016 Buscar las horas disponibles para la fecha seleccionada en la base de datos
		var selectedDate = req.body.selectedDate;
		var selectedHour = req.body.selectedHour;
		var userData = req.body.userData;

		console.log("Selected date: " + selectedDate);
		console.log("Selected hour: " + selectedHour);
		console.log("User data: " + userData);

		//Hardcoded data
		var response = {};
		response.level = "SUCCESS";
		response.message = "";
		res.json(response);
	})


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
