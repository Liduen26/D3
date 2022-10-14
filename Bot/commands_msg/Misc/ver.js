const {EmbedBuilder } = require("discord.js");
//chargement du fichier de config et des variable
const {PREFIX,D_Liia} = require('../../core/config');

module.exports.run = (client,msg,args)=>{
    const embed = new EmbedBuilder()
        .setColor("#4169E1")
        .setTitle('Version)')
        .setDescription("Je suis la version A3.00")
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
        .setFooter({text: "Fin du Test"});

    return msg.guild.channels.cache.find(c => c.name === 'interface-bot').send(embed);

}
module.exports.help = {
    name: 'version',
    aliases: ['Version','Ver'],
    category:'Misc',
    description :'Reconnaitre le bot',
    usage:'',
    cooldowns: 5,
    permission:false,
    isUserAdmin: false,
    args: false
}