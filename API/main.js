// Setup Express.js
const express = require('express');
const app = express();

// Configure DotENV
const dotenv = require('dotenv');
dotenv.config({ path: '../config.env' });

// Middleware to parse body to JSON for all JSON requests
app.use(express.json())

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Setup Discord.js
require('../BOT/discordmain')


// API Routes et Ports
const port = process.env.PORT_API || 5000;

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`)
})

app.use('/api/servers', require('./routes/servers'))
app.use('/api/messaging', require('./routes/messaging'))
app.use('/api/kick', require('./routes/kick'))
app.use('/api/ban', require('./routes/ban'))
app.use('/api/createsalontextuel', require('./routes/createsalontextuel'))
app.use('/api/createsalonvocal', require('./routes/createsalonvocal'))
app.use('/api/deletesalon', require('./routes/deletesalon'))
app.use('/api/bracelet', require('./routes/bracelet'))
app.use('/api/nobracelet', require('./routes/nobracelet'))
app.use('/api/unban', require('./routes/unban'))
app.use('/api/joinchannel', require('./routes/joinchannel'))
app.use('/api/leavechannel', require('./routes/leavechannel'))
app.use('/api/playsound', require('./routes/playsound'))
