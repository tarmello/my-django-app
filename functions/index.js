const { spawn } = require('child_process');
const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all handler for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

// Function to handle Django server
app.all('/api/*', (req, res) => {
  const django = spawn('gunicorn', ['pandapost2.wsgi:application', '--bind', '0.0.0.0:8080'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      DJANGO_SETTINGS_MODULE: 'pandapost2.settings',
    },
  });

  django.on('error', (error) => {
    console.error(`Error spawning Django process: ${error.message}`);
    res.status(500).send('Internal Server Error');
  });

  django.on('close', (code) => {
    console.log(`Django process exited with code ${code}`);
  });

  req.pipe(django.stdin);
  django.stdout.pipe(res);
});

// Expose Express server as a single Cloud Function:
exports.app = require('@google-cloud/functions-framework').http('app', app);
