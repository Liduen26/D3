const express = require('express')
const router = express.Router()
const functions = require('../../BOT/functions')

router.post('/channel', async (req, res) => {
  try {
     await functions.createsalontextuel(req.body.guildID, req.body.categoryID, req.body.channelname)
     res.status(200).json({ message: 'channel created' })
  } catch (err) {
    res.status(500).json(err)
    console.error(err)
  }
})


module.exports = router