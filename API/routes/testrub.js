const express = require('express')
const router = express.Router()
const functions = require('../../BOT/functions')

router.get('/test', async (req, res) => {
  try {
    await functions.testrub(req.body.guildID)
    res.status(200).json({ message: 'Oe ca marche jcrois' })
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})

module.exports = router