const express = require('express')
const router = express.Router()
const functions = require('../../BOT/functions')

router.post('/user', async (req, res) => {
  try {
    await functions.kick(req.body.userID, req.body.guildID, req.body.reason)
    res.status(200).json({ message: 'User Kicked' })
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})

module.exports = router