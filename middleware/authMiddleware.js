const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).send({
                success: false,
                message: "Auth Failed, No Token"
            });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Auth Failed, Invalid Token Format"
            });
        }

        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: "Auth Failed",
                    err
                });
            } else {
                req.body.userId = decode.userId;
                next();
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: "Auth Failed",
            error
        });
    }
};