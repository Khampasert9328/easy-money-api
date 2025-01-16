const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const cors = require('cors');

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};

//Datatbase connection
const useDatabase = require('./src/config/configDB');

//router
const usersRouter = require('./src/routes/users/users');
const customersRouter = require('./src/routes/customers/customers_router');
const contractsRouter = require('./src/routes/contracts/contracts_router');
const paymentsRouter = require('./src/routes/payments/payments_router');

const app = express();
useDatabase();

app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//use router
app.use('/users', usersRouter);
app.use('/customers', customersRouter);
app.use('/contracts', contractsRouter);
app.use('/payments', paymentsRouter);

module.exports = app;
