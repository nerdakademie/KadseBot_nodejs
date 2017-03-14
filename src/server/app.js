const config = require('config');
const bodyParser = require('body-parser');
const express = require('express');
const compression = require('compression');
const consolidate = require('consolidate');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const argv = require('minimist')(process.argv.slice(2));
const path = require('path');

const webpack = require('webpack');
const app = express();

app.disable('x-powered-by');

app.locals.pretty = true;
app.locals.cache = 'memory';

app.use(compression({level: 9}));

app.engine('html', consolidate.swig);
app.set('views', `${__dirname}/../../resources/server/view`);
app.set('view engine', 'html');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

require('mongoose').connect(config.get('db-url'));
require('./model/userModel');
require('./model/statisticModel');
require('./model/apiModel');

app.use(config.rootPath, require('./routes/public/publicRoutes'));
app.use(`${config.rootPath}/api`, require('./routes/api/apiRoutes'));

app.use(require('./routes/errorRoutes'));

module.exports = app;
