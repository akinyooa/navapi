# luna-api

In order to use swagger run:

# Dev setup
## Command Line
* npm install
* export CASSANDRA_HOSTS=35.176.26.54 (or 127.0.0.0 for localhost)
* export CASSANDRA_PORT=9042
* export PORT=3010
* export NODE_ENV=dev (if connecting to localhost for swagger)
* start the server with node server

## Visual Studio Code
* download from https://code.visualstudio.com/
* open luna-api directory with Visual Studio Code
* run npm install from command line
* F5 to run

## Swagger
* npm install -g swagger
* browse to http://localhost:3010/swagger to test API
* to edit API documentation run swagger project edit