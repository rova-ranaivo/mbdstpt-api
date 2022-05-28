const jwt = require('jsonwebtoken');

authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).send({ message: 'error 401 - Invalid token!' }); 

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send({ message: err });

        req.user = user;

        next();
    })
}

const auth = {
    authToken
}

module.exports = auth;