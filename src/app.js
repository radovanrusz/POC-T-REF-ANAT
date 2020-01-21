const express = require('express');
const authRouter = require('./routers/auth');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods', 
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Cache-Control, Pragma, Origin, ' +
        'Authorization, Content-Type, X-Requested-With'
    );
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

app.use(express.json());
app.use(authRouter);

module.exports = app;