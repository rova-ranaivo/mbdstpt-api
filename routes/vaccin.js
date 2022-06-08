const Vaccin = require('../models/vaccin');

function getVaccins(req, res) {
    Vaccin.find({}, function(err, vaccins){
        if(err){
            console.log(err);
        }
        else {
            res.json(vaccins);
        }
    });
}

module.exports = { getVaccins };
