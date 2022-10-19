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
.addStringOption(option =>
	option.setName("type")
	.setDescription("Publiquement?")
	// .addChoice("publique", "public")
	// .addChoice("privée", "private")
	.setRequired(false)
)
.addStringOption(option => 
	option.setName("salon")
	.setDescription("Où le message sera envoyer")
	.setRequired(false)
)
.addStringOption(option => 
	option.setName('user')
	.setDescription("L'utilisateur à interpeller")
	.setRequired(false)
)
,
new SlashCommandBuilder()
.setName("wesh")
.setDescription("JUL JUL JUL"),

new SlashCommandBuilder()
.setName("bracelet")
.setDescription("Ajoute un bracelet electronique a l'utilisateur cible")
.addUserOption(option => 
	option.setName('utilisateur')
	.setDescription("L'utilisateur qui va prendre le bracelet")
	.setRequired(true)
)
];