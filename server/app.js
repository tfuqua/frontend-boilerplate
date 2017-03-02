import express from 'express';
import React from 'react';
import App from '../src/App';
import { render, template } from 'rapscallion';
import { Route, StaticRouter } from "react-router-dom";
import config from '../config/env/config';
import assets from '../build/asset-manifest.json';

const port = config.port;
const app = express();
app.use(express.static('./build'));


app.use("*", (req, res) => {

  console.log(assets);
  const context = {};
  const markup = render(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const responseRenderer = template`<html><head><meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Front-End Boilerplate</title>
        <link rel="stylesheet" href="/${assets['main.css']}"></head><body>${markup}</body><script src="/${assets['main.js']}"></script></html>`;
  responseRenderer.toStream().pipe(res);
});

app.listen(port, (error) => {
  if (!error) {
    console.log(`App is up and running over port ${port}`);
  }
});

module.exports = app;
