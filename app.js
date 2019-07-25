var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require("body-parser");
var debug = require('debug')('view-engine:server');
var http = require('http');
var express = require("express");
var flash = require('connect-flash');
var mongoose = require('mongoose');
import {randomGenerator} from './modules/common';
import { ApolloServer } from 'apollo-server-express';


import typeDefs from './schema/typeDefs';
import resolvers from './schema/resolvers';
import context from './schema/context';


var app = express();


var indexRouter = require('./routes/index');

app.use('/', indexRouter);

mongoose.connect("mongodb+srv://nearme:123jahu123@coronam-dxmaq.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context
  });
  
server.applyMiddleware({ app });

var port = 8088;

/**
 * Listen on provided port, on all network interfaces.
 */

app.listen(port, function () {
  console.log(`🚀Server ready at http://localhost:8088/${server.graphqlPath}`)
});

