const mongoose = require('mongoose');

let vaccinSchema = mongoose.Schema({
    nomVaccin: String
});

module.exports = mongoose.model('vaccins', vaccinSchema);