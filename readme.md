# Authentication and Authorization service

This is example of authentication and authorization service created for educational purposes. Service is exposing API to aquire JWT token based on user rights and roles configured in LDAP.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Implementation requires Nodejs and Docker.

### Installing

* Clone repository.
* Run npm install (to get all dependencies).
* Run docker-componse up --force-recreate (to create and start containers).

#### Running in dev/test mode

Dev and test mode is not using docker. It can be started by npm run dev (npm run test). In such case public ldap www.zflexldap.com:389 is used. This can be changed in env config files.

#### Running in docker

Standard run is based on docker containers. In such case 2 containers are started one for application itself, second containing OpenLDAP with configuration. Use docker-compose up --force-recreate to ensure that LDAP configuration is loaded again.

### Configurations

Following configurations are part of project:
* env config - connection to LDAP and exposed port.
* docker-compose.yml - docker configuration file.
* bootstrap.ldif - LDAP users and roles configuration.

## Exposed APIs and example of calls

/login
Call checks provided credentials and creates JWT token with user data and roles.
Example: 
curl -d '{"uid":"tuser", "password":"tuser123", "clientId":"aclient"}' -H "Content-Type: application/json" -X POST http://localhost:8080/login 

/verify
This method will be moved out of service and should be implemented by Service Provider. Provides payload based on provided jwt token.
Example:
curl -d '{"jwt":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJCYWJ5c2l0dGVyIiwiRGlzaHdhc2hlciJdLCJpYXQiOjE1NzU1Mzk4ODksImV4cCI6MTU3ODEzMTg4OSwiYXVkIjoiYWNsaWVudCIsImlzcyI6IkF1dGhvcml6YXh0aW9uL1Jlc291cmNlL1RoaXMgc2VydmVyIiwic3ViIjoiaWFtQHVzZXIubWUifQ.n0x-4-vk5A5heiR1dLw5hT-q8kMe4JM3bmudywFQZWPWaPf5C6AgUDNsPK1iL4nkszI2yE8hFouq-6wB0t6_dA", "clientId":"aclient"}' -H "Content-Type: application/json" -X POST http://localhost:8080/verify

## Deployment

Add additional notes about how to deploy this on a live system

