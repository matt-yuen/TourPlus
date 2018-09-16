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
    const guide = req.body.guideNotifToken;
    const tourist = req.body.touristNotifToken;

    var tokens = []; // Guide token first

    tokens.push(guide);
    tokens.push(tourist);

    let i = 0;
    for(let token of tokens) {
        if(!Expo.isExpoPushToken(token)) {
            console.error(`Push token ${token} is not a valid push token`);
            return;
        };

        messages.push({
            to: token,
            sound: 'default',
            title: 'Alert!',
            body: i == 0 ? 'One of your tour members is far away from you.' : 'You are too far from your tour guide. Please stay close.'
        });

        i++;
    };

    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];

    (async () => {
        for (let chunk of chunks) {
            try {
                let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                console.log(ticketChunk);
                tickets.push(...ticketChunk);
            } catch (error) {
                console.log('error');
                console.error(error);
            }
        }
    })();

    res.send('Sending notification');
};