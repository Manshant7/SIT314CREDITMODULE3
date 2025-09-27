const express = require('express');
const app = express();
app.use(express.json());

app.post('/hvac', (req, res) => {
    const { room, status } = req.body;
    console.log(`HVAC in ${room} is now ${status}`);
    res.send({ message: `HVAC updated for ${room}` });
});

app.listen(4000, () => console.log('HVAC Node running on port 4000'));
