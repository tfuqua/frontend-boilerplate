import express from 'express';
import React from 'react';
import App from '../src/App';
import { render, template } from 'rapscallion';
import { Route, StaticRouter } from "react-router-dom";
import config from '../config/env/config';

const port = config.port;
const app = express();

app.use(express.static('./build'));


app.use("*", (req, res) => {

  const context = {};

  const markup = render(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const responseRenderer = template`<html><body>${markup}</body></html>`;
  responseRenderer.toStream().pipe(res);
});

app.listen(port, (error) => {
  if (!error) {
    console.log(`App is up and running over port ${port}`);
  }
});

module.exports = app;
