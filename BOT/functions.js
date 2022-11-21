const discord = require('./discordmain')
const fetch = require('node-fetch')
const { ChannelType } = require('discord.js')

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

// Crée un salon textuel
async function createsalontextuel(guildID, categoryID, channelname){
  const guild = discord.client.guilds.cache.get(guildID)
  guild.channels.create({
    name: channelname,
    type: ChannelType.GuildText,
    parent: categoryID,
});
}

// Crée un salon vocal 
async function createsalonvocal(guildID, categoryID, channelname){
  const guild = discord.client.guilds.cache.get(guildID)
  guild.channels.create({
    name: channelname,
    type: ChannelType.GuildVoice,
    parent: categoryID,
});
}
// Supprime un salon textuel / vocal
async function deletesalon(guildID, channelID){
  const guild = discord.client.guilds.cache.get(guildID)
  guild.channels.delete(channelID)
}

//ajoute un bracelet a l'utilisateur cible
async function bracelet(guildID, userID, roleID){
//trouve le bon server
  const guild = discord.client.guilds.cache.get(guildID)
  //console.log(guild.roles.cache.map(role => ({name : role.name})));
  //console.log(guild.members.cache.map(member => ({member : member.user.username})));
  const role = guild.roles.cache.get(roleID);
  //console.log(role);
  const member = guild.members.cache.get(userID)
  //console.log(member);
  member.roles.add(role);
}

//retire un bracelet a l'utilisateur cible
async function nobracelet(guildID, userID, roleID){
    const guild = discord.client.guilds.cache.get(guildID)
    const role = guild.roles.cache.get(roleID);
    const member = guild.members.cache.get(userID)
    member.roles.remove(role);
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
  createsalontextuel: createsalontextuel,
  createsalonvocal : createsalonvocal,
  deletesalon : deletesalon,
  bracelet : bracelet,
  nobracelet : nobracelet,
  diss: diss,
  sendMessage: sendMessage,
  diss: diss,
}