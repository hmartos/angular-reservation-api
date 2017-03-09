var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ReservationSchema   = new Schema({
	name: String
});

module.exports = mongoose.model('Reservation', ReservationSchema);