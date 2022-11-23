const express = require('express')
const router = express.Router()
const functions = require('../../BOT/functions')

router.post('/norole', async (req, res) => {
  try {
     await functions.nobracelet(req.body.guildID, req.body.userID, req.body.roleID)
     res.status(200).json({ message: 'bracelet retiré' })
  } catch (err) {
    res.status(500).json(err)
    console.error(err)
  }
})


module.exports = router