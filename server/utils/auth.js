const jwt = require('jsonwebtoken');

const secret = 'mysecretshhh';
const expiration = '2h';

module.exports = {
    signToken: function ({ username, email, _id, department }) {
        const payload = { username, email, _id, department };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
    authMiddleware: function ({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;

        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        }

        try {
            //decode and attach user data to request object
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        }
        catch {
            console.log('Invalid Token');
        }

        return req;
    }

}