// Firebase
var firebase = require('firebase-admin');
var serviceAccount = require('../tourplus-1023d-firebase-adminsdk-5nr4f-3f9cf9198d.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://tourplus-1023d.firebaseio.com'
});

exports.send_notif = (req, res) => {
    console.log(req.body);

    res.send('Sending notif');
};