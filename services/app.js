const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Adding routes
const notifications = require('./routes/notifications.js');
const face_recog = require('./routes/face_recog.js');
app.use('/notifications', notifications);
app.use('/face_recog', face_recog);

app.get('/', (req, res) => res.send('Testing'));

app.listen(port, () => {
    console.log("Server is running. Port: ", port);
});