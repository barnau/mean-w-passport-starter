var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
    location: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    posterLocation: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Movie', MovieSchema);