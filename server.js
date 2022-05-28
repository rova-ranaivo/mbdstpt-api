require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
let bodyParser = require('body-parser');
const authenticateToken = require('./middleware/authenticateToken');
const app = express();
const port = process.env.PORT || 3000;
let personne = require('./routes/personne');

let authentication = require('./routes/authentication');

const uri = "mongodb+srv://rova:CN575VGubArg1XhN@tpt-cluster.9xlcm.mongodb.net/ecovid?retryWrites=true&w=majority";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.Promise = global.Promise;

mongoose.connect(uri, options)
    .then(() => {
        console.log('connexion to db succeed!');
        personne.getPersonnes();
    }, 
    err => {
        console.log('connexion to db failed!', err);
    })

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token,Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.route('/authenticate')
    .post( authentication.authenticateUser)
    .get( authentication.authenticateUser)

app.route('/personnes')
    .get(personne.getPersonnes)
    .post(personne.addPersonne)

app.route('/personne/:id')
    .get(personne.getPersonne)

app.route('/data')
    .get([authenticateToken.authToken], (req, res, next) => res.json({ message: 'OK deba a!!!' }) );

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
