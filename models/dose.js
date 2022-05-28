let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let DoseSchema = Schema({
    nomVaccin: String,
    dateVaccination: Date,
});

DoseSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('dose', DoseSchema);