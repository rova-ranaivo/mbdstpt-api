let Personne = require('../models/personne');

function getPersonnes(req, res) {
    
    var aggregateQuery = Personne.aggregate();
    Personne.aggregatePaginate(aggregateQuery,
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 1000,
        },
        (err, personnes) => {
            if (err) {
                res.send(err);
            }
            res.send(personnes);
        }
    );
}

function addPersonne(req, res) {
    let p = new Personne();
    p.nom = req.body.nom;
    p.prenom = req.body.prenom;
    p.doses = req.body.doses;
    p.genre = req.body.genre;
    p.dateDeNaissance = req.body.dateDeNaissance;
    p.adresse = req.body.adresse;

    p.save((err) => {
        if (err) {
            res.send('cant post personne ', err);
        }
        res.json({ message: `${p.nom} saved!` })
    })
}

function getPersonne(req, res) {
    let personneId = req.params.id;

    Personne.findOne({ _id: personneId }, (err, personne) => {
        if (err) { res.send(err) }
        res.json(personne);
    })
}

function addDoseToPersonne(req, res) {
    console.log(req.body, "------------------");
    Personne.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, personne) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            res.json({ message: `${personne} mis à jour!`, result: personne })
        }
    });
}

module.exports = { getPersonnes, addPersonne, getPersonne, addDoseToPersonne };
