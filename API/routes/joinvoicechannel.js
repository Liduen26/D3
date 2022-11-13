const express = require('express')
const router = express.Router()
const functions = require('../../BOT/functions')

router.post('/voicechannel', async (req, res) => {
  try {
     await functions.ban(req.body.channelID, req.body.guildID, req.body.adapterCreator)
     res.status(200).json({ message: 'BOT Joined' })
  } catch (err) {
    res.status(500).json(err)
    console.error(err)
  }
})


module.exports = router