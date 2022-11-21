// Setup Express.js
const express = require('express')
const app = express()

// Configure DotENV
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

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
require('./BOT/discordmain')


// API Routes et Ports
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`)
})

app.use('/api/servers', require('./API/routes/servers'))
app.use('/api/messaging', require('./API/routes/messaging'))
app.use('/api/kick', require('./API/routes/kick'))
app.use('/api/ban', require('./API/routes/ban'))
app.use('/api/unban', require('./API/routes/unban'))
app.use('/api/joinchannel', require('./API/routes/joinchannel'))
app.use('/api/leavechannel', require('./API/routes/leavechannel'))
app.use('/api/playsound', require('./API/routes/playsound'))