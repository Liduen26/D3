const discord = require('./discordmain')
const fetch = require('node-fetch')


// const guildou = await discord.client.guilds.fetch(guildID)
// guildou.bans.fetch().then(console.log).catch(console.error)

// unban
async function unban(guildID, userID) {
  try {
    const guild = await discord.client.guilds.fetch(guildID)

    // check si l'id est bon
    const bannis = await guild.bans.fetch(userID).then(console.log).catch(console.error);

    // unban l'utilisateur
    await guild.bans.remove(userID).then(user => console.log(`Unbanned ${user.username} from ${guild.name}`)).catch(console.error);

    console.log("heuu salut")

  } catch (err) {
    console.error(err)
    throw err
  }
}

// Send Message To Channel
async function sendMessage(channelID, msg) {
  try {
    const channel = await discord.client.channels.fetch(channelID)
    await channel.send(msg)
  } catch (err) {
    console.error(err)
    throw err
  }
}

// Kick a User
async function kick(userID, guildID, reason) {
  try {
    const kickableUser = await discord.client.users.fetch(userID)
    const guild = await discord.client.guilds.fetch(guildID)
    const kickableMember = await guild.members.fetch(kickableUser)
    await kickableMember.kick(reason)
  } catch (err) {
    console.error(err)
    throw err
  }
}

// Ban a User
async function ban(userID, guildID, reason) {
  try {
     const bannableUser = await discord.client.users.fetch(userID)
     const guild = await discord.client.guilds.fetch(guildID)
     await guild.members.ban(bannableUser, {
       days: 0,
       reason: reason
     })
  } catch (err) {
    console.error(err)
    throw err
  }
}

// Diss a User
async function diss(channelID, victim) {
  try {
    // Generate Insult
    const res = await fetch(process.env.INSULT_GEN_URI)
    const data = await res.json()

    // Send Insult
    await sendMessage(channelID, `${victim}, ${data.insult}`)
  } catch (err) {
    console.error(err)
    throw err
  }
}

module.exports = {
  kick: kick,
  ban: ban,
  diss: diss,
  sendMessage: sendMessage,
  diss: diss,
  unban: unban,
}