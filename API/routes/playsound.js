const express = require('express')
const router = express.Router()
const functions = require('../../Bot/functions')

router.post('', async (req, res) => {
  try {
    await functions.playsound(req.body.guildID)
    res.status(200).json({ message: 'Sound played' })
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})

module.exports = router