const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
app.use(express.json());

const uri = 'mongodb+srv://manshant4793:manshantsingh@sit314.yb4gsz9.mongodb.net/?retryWrites=true&w=majority&appName=SIT314';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const logSchema = new mongoose.Schema({
    room: String,
    temperature: Number,
    humidity: Number,
    chairsUsed: Number,
    hvacStatus: String,
    timestamp: Date
});
const Log = mongoose.model('Log', logSchema);

app.post('/sensor', async (req, res) => {
    const data = req.body;
    let hvacStatus = 'off';

    if (data.temperature > 25 || data.chairsUsed > 10) {
        hvacStatus = 'on';
        await axios.post('http://localhost:4000/hvac', { room: data.room, status: hvacStatus });
    }

    const logEntry = new Log({ ...data, hvacStatus, timestamp: new Date(data.timestamp) });
    await logEntry.save();

    res.send({ message: `HVAC ${hvacStatus}`, data });
});

app.listen(3000, () => console.log('Edge Node running on port 3000'));
