const express = require('express')
const router = express.Router()
const functions = require('../../BOT/functions')

router.post('/role', async (req, res) => {
  try {
     await functions.bracelet(req.body.guildID, req.body.userID, req.body.roleID)
     res.status(200).json({ message: 'bracelet ajouté' })
  } catch (err) {
    res.status(500).json(err)
    console.error(err)
  }
})


module.exports = router