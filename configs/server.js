/* eslint-disable func-names */
/* eslint-disable no-console */
require('dotenv').config();

const express = require('express');
const next = require('next');

const sslRedirect = require('./ssl');

const port = parseInt(process.env.PORT, 10) || 3000;
const production = process.env.NODE_ENV === 'production';
const dev = !production && process.env.NODE_ENV !== 'staging';
const enableRedirect = process.env.ENABLE_REDIRECT === 'true';

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  if (!dev && enableRedirect) {
    server.use(sslRedirect(['staging', 'production']));
  }

  server.all('*', (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Environment: ${process.env.NODE_ENV}`);
    console.log('> Next public envs:');
    Object.keys(process.env).forEach(function (key) {
      if (key.startsWith('NEXT_PUBLIC_')) {
        console.log(` + ${key}="${process.env[key]}"`);
      }
    });
    console.log(`\n> Ready on http://localhost:${port}`);
  });
});
