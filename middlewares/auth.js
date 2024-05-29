const jwt = require("jsonwebtoken");
require("dotenv").config();
const users = require("../database/users.json");

const authenticate = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) res.status(401).send('Devi prima autenticarti');

    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            err.message === 'invalid signature' && res.status(401).send('Non sei autorizzato');
            err.message === 'jwt expired' && res.status(403).send('Sessione scaduta');
        }

        req.user = user;

        next();
    })
}

const authenticateAdmin = (req, res, next) => {
    const { username, password } = req.user;
    const user = users.find(user => user.username === username && user.password === password);

    if (!user || !user.admin) res.status(403).send('Non sei autorizzato, devi essere admin');

    next();
}

module.exports = {
    authenticate,
    authenticateAdmin
};