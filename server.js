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


mongoose.connect('mongodb://localhost:27017/reservations'); // connect to our database
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
        var selectedDate = req.query.selectedDate;
        console.log("Selected date: " + selectedDate);

        Reservation.findOne({}).
            where('date').equals(selectedDate).
            sort('hour').
            lean().
            exec(function (err, schedule) {
                if (err) return handleError(err);

                console.log("Schedule for selected date: " + JSON.stringify(schedule));
                var response = {};
                response.availableHours = [];

                if (schedule) {
                    var notAvailableCount = 0;
                    for (var i = 0; i < schedule.hours.length; i++) {
                        var hour = schedule.hours[i];

                        if (hour.available) {
                            response.availableHours.push(hour.hour);

                        } else {
                            notAvailableCount++;
                        }
                    }

                    if (notAvailableCount === schedule.hours.length) {
                        //No available hours for selected date
                        console.log("No available hours for selected date");
                        //response.level = "WARNING";
                        response.level = "SUCCESS";
                        response.message = "noAvailableHoursForSelectedDate";

                    } else {
                        //Available hours for selected date
                        console.log("Available hours for selected date: " + JSON.stringify(response.availableHours));
                        response.level = "SUCCESS";
                        response.message = "";
                    }

                } else {
                    //No schedule for selected date
                    console.log("No available schedule for selected date");
                    //response.level = "ERROR";
                    response.level = "SUCCESS";
                    response.message = "noAvailableScheduleForSelectedDate";
                }

                res.json(response);
            });
    })

router.route('/reserve')

    //Get list of available hours for selected date
    .post(function (req, res) {
        var selectedDate = req.body.selectedDate;
        var selectedHour = req.body.selectedHour;
        var userData = req.body.userData;

        console.log("Selected date: " + selectedDate);
        console.log("Selected hour: " + selectedHour);
        console.log("User data: " + JSON.stringify(userData));

        Reservation.findOne({}).
            where('date').equals(selectedDate).
            sort('hour').
            exec(function (err, schedule) {
                if (err) return handleError(err);

                console.log("Schedule for selected date: " + JSON.stringify(schedule));
                var response = {};

                for (var i = 0; i < schedule.hours.length; i++) {
                    var hour = schedule.hours[i];

                    if (hour.hour === selectedHour) {
                        hour.available = false;
                        hour.userData = userData;

                        schedule.save(function (err, updatedSchedule) {
                            if (err) return handleError(err);

                            console.log("Reservation for date: " + selectedDate + " at hour: " + selectedHour + ". Updated schedule: " + JSON.stringify(updatedSchedule));
                        });

                        response.level = "SUCCESS";
                        response.message = "See you soon!";
                    }
                }

                res.json(response);
            });
    })


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// ERROR HANDLER
function handleError(err) {
    console.log("An error occurred. Log trace: ");
    console.log(err);
}

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening on port ' + port);
