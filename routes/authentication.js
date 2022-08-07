var jwt = require("jsonwebtoken");
let Personne = require('../models/personne');

function authentication(req, res) {
    let user = { username: 'Jean', pwd: 'pwd' };
    if ( true ){
        let accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

        res.json({ accessToken })
    }
}

function authenticateUser(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    Personne.findOne({ username: username, motdepasse: password }, (error, p) => {
        if(p) {
            let response = {
                id: p._id,
                nom: p.nom,
                prenom: p.prenom,
                username: p.username,
                isAdmin: p.isAdmin,
                accessToken: jwt.sign({id: p._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:3600})
            };

            res.json(response);
        }
        else {
            res.status(401);
            res.send({'message': 'Identifiant ou mot de passe incorrect.'})
        }
    })
}

module.exports = { authenticateUser, authentication };
