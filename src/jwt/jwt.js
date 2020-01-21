const fs = require('fs');
const jwt = require('jsonwebtoken');

// Use 'utf8' to get string instead of byte array  (512 bit key)
let privateKey = null;
fs.readFile('./keys/mykey.pem', 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    privateKey = data;
});

let publicKey = null;
fs.readFile('./keys/mykey.pub', 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    publicKey = data;
});  

module.exports = {
    sign: (payload, clientId) => {
        // Token signing options
        const signOptions = {
            issuer: 'Authorizaxtion/Resource/This server',
            subject: 'iam@user.me',
            audience: clientId,            
            expiresIn: '30d', // 30 days validity
            algorithm: 'RS256'    
        };
        if (privateKey === null) {
            throw new Error('Private key not loaded');
        }

        return jwt.sign(payload, privateKey, signOptions);
    },
    verify: (token, clientId) => {
        const verifyOptions = {
            issuer: 'Authorizaxtion/Resource/This server',
            subject: 'iam@user.me',
            audience: clientId,
            expiresIn: '30d',
            algorithm: ['RS256']
        };
        if (publicKey === null) {
            throw new Error('Public key not loaded');
        }
        try {
            return jwt.verify(token, publicKey, verifyOptions);
        } catch (err) {
            console.log(err);
            
            return false;
        }
    },
    decode: (token) => {
        // Returns null if token is invalid
        return jwt.decode(token, {complete: true});
    }
}