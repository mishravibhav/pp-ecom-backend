const swaggerUI = require("swagger-ui-express");
const path = require('path')
const YAML = require("yamljs");
const yamalpath = path.join(__dirname, "../docs/api.yaml")
const swaggerJSDocs = YAML.load(yamalpath);

const options = {
    customCss: `img {content:url(\'../logo.svg\'); height:auto;} `,
    customfavIcon: "../favicon.ico",
    customSiteTitle: "Code Improve API Doc",

};

 module.exports = { swaggerServe: swaggerUI.serve, swaggerSetup: swaggerUI.setup(swaggerJSDocs,options) };