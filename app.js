const express = require('express');
const bodyParser = require('body-parser')

const urlShortener = require('./routes/urlShortener')

const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 8000;
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/', urlShortener)


process.on('uncaughtException', function(error){
    console.log('UnCaught Exception Caught');
});

process.on('unhandledRejection', function(error){
    console.log('unhandledRejection Exception Caught', error);
});

app.listen(PORT, ()=>{
    console.log(`Application Listening in PORT ${PORT}`);
})