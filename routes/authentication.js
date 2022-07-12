var jwt = require("jsonwebtoken");
let Personne = require('../models/personne');

function authentication(req, res) {
    let user = { username: 'Jean', pwd: 'pwd' };
    // 1. TODO Recuperer l'utilisateur au niveau de mongodb

    // 2. si authentification ok ( l'utilisateur existe)
    if ( true ){
        let accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

        res.json({ accessToken })
    }
}

function authenticateUser(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let identifiant = req.body.identifiant;
    // let userPassword = req.body.motDePasse;
    // let accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

    console.log('username ===> ', username);
    console.log('password ===> ', password);
    console.log('password ===> ', identifiant);

    // Personne.findOne({ username: identifiant }).then(
    //     function (mm) {
    //         if (mm) {
    //             let response={
    //                 id:mm._id,
    //                 identifiant:mm.username,
    //                 user:mm.nom,
    //                 accessToken:jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    //             }
            
    //             res.json(response);
    //         }else{
    //             res.json({"message":"authentication failed"});
    //         }
    //     }
    // );
    Personne.findOne({ username: username, password: password }, (error, p) => {
        if(p) {
            console.log(" ==============> ", p)

            let response = {
                id: p._id,
                nom: p.nom,
                prenom: p.prenom,
                accessToken: jwt.sign({id: p._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:3600})
            };

            res.json(response);
        }
        else {
            res.json({"message": "Authentication failed" + error});
        }
    })
}

module.exports = { authenticateUser, authentication };
