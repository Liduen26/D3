const express = require('express')
const router = express.Router()
const functions = require('../../BOT/functions')

router.post('/message/:channelID', async (req, res) => {
  try {
    const channelID = req.params.channelID

    await functions.sendMessage(channelID, req.body.message)
    res.status(200).json({ message: 'Message Posted' })
  } catch (err) {
    res.status(500).json(err)
    console.error(err)
  }
})

router.post('/diss/:channelID', async (req, res) => {
  try {
    const channelID = req.params.channelID
    await functions.diss(channelID, req.body.victim_name)

    res.status(200).json({ message: 'Message Posted' })
  } catch (err) {
    res.status(500).json(err)
    console.error(err)
  }
})

module.exports = router