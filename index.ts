// const express = require('express');
require('dotenv').config();
import express from 'express';
import { Express, Application } from 'express';
import cors from 'cors';
import colors from 'colors';
import schema from './schema';

// local imports
import connectDB from './config/connectDb';
import middleware from './middleware';
import { graphqlHTTP } from 'express-graphql';
colors.enable();

const app = express();

app.use(cors());
app.use(middleware);

// connect to mongoDB
connectDB();

const port: number | string = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

app.get('/', (req, res) => {
  res.json({
    msg: 'Welcome To The Blog API',
  });
});

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));
