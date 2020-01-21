const express = require('express');
const Jwt = require('../jwt/jwt');
const LdapClient = require('promised-ldap');

console.log("Starting LDAP client for", process.env.LDAP_URL);
const client = new LdapClient({url: process.env.LDAP_URL});

const router = new express.Router();

router.post('/login', (req, res) => {
    try {
        const uid = req.body.uid; 
        const password = req.body.password; 
        const clientId = req.body.clientId; 
        // const dn = `uid=${uid},${process.env.LDAP_BASE}`;
        const dn = `cn=${uid},${process.env.LDAP_BASE}`;

        console.log(`Trying to log in user ${dn} with pass ${password}`)
        client.bind(dn, password)
        .then((result) => {            
            return client.search(dn, {scope: 'sub'});
        }, reason => {
            console.log(reason);
            res.status(401).send();
            return Promise.reject();
        })
        .then((result) => {            
            //console.log(result);
            const roles = result.entries.map((entry) => { 
                const attributes = entry.attributes.reduce((acc, v) => {
                    acc[v.type] = v._vals[0].toString();
                    return acc;
                }, {});

                if (attributes['objectClass'] == 'organizationalRole'){
                    return attributes['cn'];
                }
                return null;
            }).filter((role) => {
                return role !== null;
            });      

            const payload = {  
                roles: roles
            }
            console.log('Creating JWT with payload', payload);
            res.status(200).send(Jwt.sign(payload, clientId));
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send()
        });        
    } catch(e) {
        console.log(e);
        res.status(500).send()
    }
});

router.post('/verify', (req, res) => {
    try {
        const token = req.body.jwt; 
        const clientId = req.body.clientId; 
        const result = Jwt.verify(token, clientId)
        if (result === false) {
            console.log('Error verifying jwt');
            res.status(401).send('Error verifying jwt');
        } else {
            res.status(200).send(result);
        }
    } catch(e) {
        res.status(500).send();
        console.log(e);
    }
});


module.exports = router