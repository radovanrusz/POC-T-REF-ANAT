const request = require('supertest')
const app = require('../src/app')

test('Login-Verify', async () => {
    const loginResponse = await request(app).post('/login').
        send({uid: 'guest1',
            password: 'guest1password',
            clientId: 'aclient'}).
        expect(200);

    const jwt = loginResponse.body.jwt;
    expect(jwt).not.toBeNull();

    const verifyResponse = await request(app).post('/verify').
        send({jwt: jwt,
            clientId: 'aclient'}).
        expect(200);

    expect(verifyResponse.body.givenName).not.toBeNull();
});

