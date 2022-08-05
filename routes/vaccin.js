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

function getVaccin(req, res) {
    let personneId = req.params.id;

    Vaccin.findOne({ _id: personneId }, (err, personne) => {
        if (err) { res.send(err) }
        res.json(personne);
    })
}

function addVaccin(req, res) {
    let v = new Vaccin();
    v.nomVaccin = req.body.nomVaccin;
    v.description = req.body.description;

    v.save((err) => {
        if (err) {
            res.send('Echec de l\'ajout du vaccin ', err);
        }
        res.json({ message: `${v.nomVaccin} enregistrer avec succes !` })
    })
}

module.exports = { getVaccins, addVaccin, getVaccin };
