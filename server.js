const express = require('express');
const path = require('path')
const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, '/app')))

const port = 3000

// connect mongo database
require('./app/database/mongo/connection.mongo.database')

// routes
app.use('/',require('./app/routes/index.route'))

// app.use(errorLogger)
// app.use(errorResponder)
// app.use(invalidPathHandler)

app.all('*', (req, res, next) => {

    res.status(404).send({ success: false, error:`Can't find ${req.originalUrl} on the server`});
    // next();
  });

app.listen(port,()=>{
    console.log(`app is listing at port : ${port}`)
})


module.exports = app