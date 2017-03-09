// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

var mongoose = require('mongoose');
var cors = require('cors');


mongoose.connect('mongodb://localhost:27017/reservation'); // connect to our database
var Reservation = require('./app/models/reservation'); //Schema

//CORS
app.use(cors());

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({message: 'Running!'});
});

// Reservation module routes
router.route('/availableHours')

    //Get list of available hours for selected date
    .get(function (req, res) {
        /*Reservation.findById(req.params.bear_id, function(err, bear) {
         if (err)
         res.send(err);
         res.json(bear);
         });*/
        //TODO Hector 05/02/2016 Buscar las horas disponibles para la fecha seleccionada en la base de datos
        var selectedDate = req.params.selectedDate;
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
    .post(function (req, res) {
        /*Reservation.findById(req.params.bear_id, function(err, bear) {
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
console.log('Listening on port ' + port);
