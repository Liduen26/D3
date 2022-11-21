const express = require('express')
const router = express.Router()
const functions = require('../../Bot/functions')

router.post('', async (req, res) => {
  try {
    await functions.joinchannel(req.body.channelID, req.body.guildID)
    res.status(200).json({ message: 'Channel joined' })
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})

module.exports = router