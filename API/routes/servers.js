const express = require('express')
const router = express.Router()
const discordinfo = require('../../BOT/discordmain')

// Get all servers {ID ane Name}
router.get('', (req, res) => {
  try {
    const guilds = discordinfo.client.guilds.cache.map(guild => ({id: guild.id, name: guild.name, channel: guild.channels}))
    res.status(200).json(guilds)
  } catch (err) {
    res.status(404).json(err)
  }
})

// Get specific metadata from server with ID
router.get('/:serverID', async (req, res) => {
  try {
    const serverID = req.params.serverID
    const guild = await discordinfo.client.guilds.fetch(serverID)

    bot.on('interactionCreate', async interaction => {
      const allMembers = await interaction.guild.members.fetch();
      allMembers.forEach(m => {
         console.log(m.user.username);
      });
     });

    // Get Members
    const members = await guild.members.cache.map(member => ({id: member.id, idtype: "memberID", name: member.displayName}))

    // Get Channels
    const channels = await guild.channels.cache.map(channel => ({id: channel.id, idtype: "channelID", name: channel.name, channeltype: channel.type}))
    const channelsModified = channels.filter(channel => channel.channeltype)
    // const channelsModified = channels.filter(channel => channel.channeltype === "text")

    // Create Response
    const response = {members: members, channels: channelsModified}

    res.status(200).json(response)
  } catch (err) {
    res.status(404).json(err)
  }
})

module.exports = router