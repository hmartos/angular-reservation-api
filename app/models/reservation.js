var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ReservationSchema = new Schema({
	date: String,
	hours: [{hour: String, available: Boolean, userData: Object}],
	available: Boolean
});

module.exports = mongoose.model('Reservation', ReservationSchema);