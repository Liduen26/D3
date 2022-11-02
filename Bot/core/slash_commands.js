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
new SlashCommandBuilder()
.setName("explosion")
.setDescription("EXPLOOOOOOOOOOOOOOOOOSION"),

new SlashCommandBuilder()
.setName("bracelet")
.setDescription("Ajoute un bracelet electronique a l'utilisateur cible")
.addUserOption(option => 
	option.setName('utilisateur')
	.setDescription("L'utilisateur qui va prendre le bracelet")
	.setRequired(true)
),

new SlashCommandBuilder()
.setName("nobracelet")
.setDescription("Retire le bracelet electronique a l'utilisateur cible")
.addUserOption(option => 
	option.setName('utilisateur')
	.setDescription("L'utilisateur qui va perdre le bracelet")
	.setRequired(true)
),
new SlashCommandBuilder()
.setName("ban")
.setDescription("bannir un utilisateur du server")
.setDefaultMemberPermissions(0x08) // Perms admin requises
.addUserOption(option => 
	option.setName('utilisateur')
	.setDescription("L'utilisateur a bannir")
	.setRequired(true)
),
new SlashCommandBuilder()
.setName("kick")
.setDescription("kick un utilisateur du server")
.setDefaultMemberPermissions(0x08) // Perms admin requises
.addUserOption(option => 
	option.setName('utilisateur')
	.setDescription("L'utilisateur a kick")
	.setRequired(true)
),

new SlashCommandBuilder()
.setName("addtextchannel")
.setDescription("ajoute un channel textuel au server")
.setDefaultMemberPermissions(0x08) // Perms admin requises
.addStringOption(option => 
	option.setName('channel')
	.setDescription("Le nom du channel textuel a crée")
	.setRequired(true)
),

new SlashCommandBuilder()
.setName("delltextchannel")
.setDescription("supprime un channel textuel au server")
.setDefaultMemberPermissions(0x08) // Perms admin requises
.addChannelOption(option => 
	option
	.setName('channel')
	.setDescription('Channel a supprimer')
	.addChannelTypes(ChannelType.GuildText)
	.setRequired(true)
),

new SlashCommandBuilder()
.setName("joinvoicechannel")
.setDescription("faire rejoindre un channel vocal au bot")
.addChannelOption(option => 
	option
	.setName('channel')
	.setDescription('Channel a rejoindre')
	.addChannelTypes(ChannelType.GuildVoice)
	.setRequired(true)
)

];