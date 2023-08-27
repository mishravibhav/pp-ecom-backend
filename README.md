# RESTful API Node Server Boilerplate


By running a single command, you will get a production-ready Node.js app installed and fully configured on your machine. The app comes with many built-in features, such as authentication using JWT, request validation, unit and integration tests, continuous integration, docker support, API documentation, pagination, etc. For more details, check the features list below.


## Manual Installation

If you would still prefer to do the installation manually, follow these steps:


Install the dependencies:

```bash
yarn install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Table of Contents

- [Features](#features)
- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)

## Features

- **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- **Authentication and authorization**: using [passport](http://www.passportjs.org)
- **Validation**: request data validation using [JWT](https://jwt.io/)
- **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- **Testing**: unit and integration tests using [Jest](https://jestjs.io)
- **Error handling**: centralized error handling mechanism
- **API documentation**: with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
- **Process management**: advanced production process management using [PM2](https://pm2.keymetrics.io)
- **Dependency management**: with [npm](https://www.npmjs.com/)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- **Santizing**: sanitize request data against xss and query injection
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Compression**: gzip compression with [compression](https://github.com/expressjs/compression)
- **Linting**: with [ESLint](https://eslint.org)

## Commands

Running locally:

```bash
npm run start:dev
```

Running in production:

```bash
yarn run start:prod
```

Testing:

```bash
# run all tests
npm run test

# run all tests in watch mode
npm test:watch
```

Linting:

```bash
# run ESLint
npm lint
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=3000

```

## Project Structure

```
root\
 |- app\
    |--config\         # Environment variables and configuration related things
    |--controllers\    # Route controllers (controller layer)
    |--database\       # Database scripts
    |--docs\           # Swagger files
    |--middlewares\    # Custom express middlewares
    |--models\         # Mongoose models (data layer)
    |--routes\         # Routes
    |--utils\          # Utility classes and functions
  |--server.js        # App entry point
```

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3000/v2/docs` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written as comments in the route files.

### API Endpoints

List of available routes:

**Auth routes**:\
`POST /auth/register` - register\
`POST /auth/login` - login\

**User routes**:\
`GET /user/overview/:userId` - get user\


## API curl requests



**/health:GET**:\
```
curl --location 'http://localhost:3000/health'
```

**/auth/register:POST**\
```
curl --location 'http://localhost:3000/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "_id":"vibhav@gmail.com",
    "name":"Vibhav Mishra",
    "password":"vijgvjgfk",
    "email":"vibhav@gmail.com"
}'
```

**/auth/login:POST**\
```
curl --location 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--header 'Cookie: vib-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJ2aWJoYXZAZ21haWwuY29tIiwiaWF0IjoxNjkyOTU1NzU5LCJleHAiOjE2OTI5OTg5NTl9.bFiLhckHCtYY52rVsa1IRg_pdCnUugvP33Wk3jf0qao' \
--data-raw '{
    "_id":"vibhav@gmail.com",
    "password":"vijgvjgfk"
}'
```

**/user/overview:GET**\
```
curl --location 'http://localhost:3000/user/overview' \
--header 'Cookie: vib-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJ2aWJoYXZAZ21haWwuY29tIiwiaWF0IjoxNjkyOTU1NzU5LCJleHAiOjE2OTI5OTg5NTl9.bFiLhckHCtYY52rVsa1IRg_pdCnUugvP33Wk3jf0qao'
```

