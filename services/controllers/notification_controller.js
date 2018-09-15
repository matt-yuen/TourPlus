// Expo
const { Expo } = require('expo-server-sdk');

// Firebase
var firebase = require('firebase-admin');
var serviceAccount = require('../tourplus-1023d-firebase-adminsdk-5nr4f-3f9cf9198d.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://tourplus-1023d.firebaseio.com'
});

var db = firebase.database();

let expo = new Expo();
let messages = [];

exports.send_notif = (req, res) => {
    // Get user ID
    const uid = req.body.uid;

    // Pull expo token from Firebase
    var expoTokenRef = db.ref(`users/${uid}/notifToken`);
    var expoToken = [];

    expoTokenRef.on('value', (snap) => {
        expoToken.push(snap.val());
    }, (err) => {
        console.log('Reading failed: ' + errorObject.code);
    });

    for(let token of expoToken) {
        if(!Expo.isExpoPushToken(token)) {
            console.error(`Push token ${token} is not a valid push token`);
            return;
        };

        messages.push({
            to: token,
            sound: 'default',
            title: 'Alert!',
            body: 'You are too far from your tour guide. Please stay close.'
        });
    }

    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];

    (async () => {
        for (let chunk of chunks) {
          try {
            let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            console.log(ticketChunk);
            tickets.push(...ticketChunk);
          } catch (error) {
            console.error(error);
          }
        }
    })();

    // Debug
    res.send('Sending notification');
};