require('express-async-errors');
require('dotenv').config();

const express = require('express')
const app = express()

const router = require('./routes/routes')

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');



app.use(express.json());



app.use('/api', router);


app.get('/', function (req, res) {
    res.send('Server is up and running!');
})

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);



app.listen(3000, function () {
    console.log('Server is listening');
})