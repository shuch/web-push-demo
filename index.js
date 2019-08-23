const express = require('express');
const webpush = require('web-push');

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails('mailto:shuchery@gmail.com', publicVapidKey, privateVapidKey);

const app = express();

app.user(require('body-parser').json());

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({ title: 'nodejs push' });

  console.log('subscription', subscription);

  webpush.sendNotification(subscription, payload).catch(error => {
    console.error(error.stack);
  })
});