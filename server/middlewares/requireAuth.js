const jwt = require('jsonwebtoken');
const { config } = require('dotenv');
config();

exports.requireAuth = (req, res, next) => {
    const auth = req.headers.authorization;
    jwt.verify(auth, process.env.SECRET_KEY, (err) => {
        if (err) {
            res.json({
                message: err.message,
                status: 401
            });
            return;
        }
        next();
    });
};