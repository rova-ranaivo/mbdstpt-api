let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let dose = require('./dose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let PersonneSchema = Schema({
    id: String,
    nom: String,
    prenom: String,
    username: String,
    motdepasse: String,
    doses: [
        {nomVaccin:String, dateVaccination: String}
    ]
});

PersonneSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('personnes', PersonneSchema);