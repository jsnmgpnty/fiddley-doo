# Fiddley Doo Services
Basic api to submit codes

### Pre-requisites
- NodeJS
- VSCode
- Docker
- If you have no Docker, make sure to have MongoDB, RabbitMQ and ELK installed locally. The services will be using default hostnames and ports.

### The tech behind
- For the backend service it uses NestJS, MongoDB, RabbitMQ and ELK for logging
- Code Service is an API that has the endpoints to submit and view code workspaces
- Code Processor handles the compilation
- Used nest-microservices template (https://www.npmjs.com/package/generator-nest-microservices)

### Running the Code Service API
- Open the project in VSCode
- From VSCode's terminal, run `cd src/code-service` to go to the app's location
- Run `npm i` to install the packages
- Run `npm start`
- Access API from `http://localhost:11000/explorer`

### Running the Code Processor App
- Open the project in VSCode
- From VSCode's terminal, run `cd src/code-processor` to go to the app's location
- Run `npm i` to install the packages
- Run `npm start`
- Access API from `http://localhost:11001/explorer`. Although this is pointless as it has no endpoints

### Running as containers
- Open the project in VSCode (or if you have it open already, add a new tab in the terminal)
- From VSCode's terminal, run `cd src` to go to the client app's location
- Run `docker-compose build` to build the services
- Run `docker-compose up -d`
- Access API from `http://localhost:11000/explorer` and `http://localhost:11001/explorer`