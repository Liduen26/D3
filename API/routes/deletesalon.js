const express = require('express')
const router = express.Router()
const functions = require('../../BOT/functions')

router.post('/dellchannel', async (req, res) => {
  try {
     await functions.deletesalon(req.body.guildID, req.body.channelID)
     res.status(200).json({ message: 'channel deleted' })
  } catch (err) {
    res.status(500).json(err)
    console.error(err)
  }
})


module.exports = router