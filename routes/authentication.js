var jwt = require("jsonwebtoken");

function authenticateUser(req, res) {
    let user = { username: 'Jean' }
    // 1. TODO Recuperer l'utilisateur au niveau de mongodb

    // 2. si authentification ok ( l'utilisateur existe)
    if ( true ){
        let accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

        res.json({ accessToken })
    }
}

module.exports = { authenticateUser };
