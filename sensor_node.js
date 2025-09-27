const axios = require('axios');

setInterval(() => {
    const data = {
        room: "Seminar Room 1",
        temperature: Math.floor(Math.random() * 10 + 20), 
        humidity: Math.floor(Math.random() * 30 + 40), 
        chairsUsed: Math.floor(Math.random() * 20 + 1), 
        timestamp: Date.now()
    };

    axios.post('http://localhost:3000/sensor', data)
        .then(res => console.log(res.data))
        .catch(err => console.error(err.message));
}, 2000);
