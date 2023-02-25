const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();


function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).send({ message: 'No token provided.' });
    }
    jsonwebtoken.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Failed to authenticate token.' });
        }
        req.userId = decoded.id;
        next();
    });
}

module.exports = {verifyToken};