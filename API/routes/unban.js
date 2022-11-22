const express = require('express')
const router = express.Router()
const functions = require('../../Bot/functions')

router.post('/user', async (req, res) => {
  try {
    await functions.unban(req.body.guildID, req.body.userID)
    res.status(200).json({ message: 'Oe ca marche jcrois' })
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})

module.exports = router