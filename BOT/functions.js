const discord = require('./discordmain')
const fetch = require('node-fetch')
const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');

// playsound
async function playsound(guildID) {
  try {    
    const player = createAudioPlayer()
    const resource = createAudioResource('C:\Utilisateurs\ruben\Bureau\waw.mp3')

    const connection = getVoiceConnection(guildID);

    player.play(resource);
    connection.subscribe(player);

  } catch (err) {
    console.error(err)
    throw err
  }
}

// leavechannel
async function leavechannel(guildID) {
  try {
    const connection = getVoiceConnection(guildID);
    connection.destroy()
  } catch (err) {
    console.error(err)
    throw err
  }
}

// joinchannel
async function joinchannel(channelID, guildID) {
  try {
    const guild = await discord.client.guilds.fetch(guildID)
    const connection = joinVoiceChannel({
      channelId: channelID,
      guildId: guildID,
      adapterCreator: guild.voiceAdapterCreator,
    });
  } catch (err) {
    console.error(err)
    throw err
  }
}

// unban
async function unban(guildID, userID) {
  try {
    const guild = await discord.client.guilds.fetch(guildID)

    // check si l'id est bon
    const bannis = await guild.bans.fetch(userID).then(console.log).catch(console.error);

    // unban l'utilisateur
    await guild.bans.remove(userID).then(user => console.log(`Unbanned ${user.username} from ${guild.name}`)).catch(console.error);

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
  joinchannel: joinchannel,
  leavechannel: leavechannel,
  playsound: playsound,
}