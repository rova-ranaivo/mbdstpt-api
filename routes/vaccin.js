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

function addVaccin(req, res) {
    let v = new Vaccin();
    v.nomVaccin = req.body.nomVaccin;

    v.save((err) => {
        if (err) {
            res.send('cant post vaccin ', err);
        }
        res.json({ message: `${v.nomVaccin} saved!` })
    })
}

module.exports = { getVaccins, addVaccin };
