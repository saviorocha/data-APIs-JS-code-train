const express = require('express');
const app = express();
const dataStore = require('nedb');

app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new dataStore('database.db');
database.loadDatabase();

app.post('/api', (request, response) => {
    console.log('I got a request!');
    console.log(request.body);

    const data = request.body
    const timestamp = Date.now();

    data.timestamp = timestamp;
    database.insert(data);

    response.json({
        timestamp: timestamp,
        status: 'success',
        latitude: data.lat,
        longitude: data.lon,
        band: data.band
    });
});