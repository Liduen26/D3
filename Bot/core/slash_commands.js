// Charquement de la lib des commandes slashs
const {SlashCommandBuilder} = require('@discordjs/builders');
const { ChannelType } = require('discord.js');

exports.slc = [

new SlashCommandBuilder()
.setName("say")
.setDescription("Fait écrire le bot")
.setDefaultMemberPermissions(0x08) // Perms admin requises
.addStringOption(option => 
	option.setName('message')
	.setDescription("message à envoyer")
	.setRequired(true)
)
,

];