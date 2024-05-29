const users = require("../database/users.json");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = user => jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1m" });

const login = (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username && user.password === password);

    if (!user) res.status(404).send('Credenziali non corrette');

    const token = generateToken(user);

    res.send(token);
}

module.exports = {
    login
}