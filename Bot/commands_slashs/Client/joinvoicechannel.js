//chargement de la librairie pour rejoindre un vocal
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = async (client,interaction)=>{
    //recup l'id du channel
    const voiceChannel = interaction.options.getChannel('channel');

    //Rejoindre le channel vocal
    const voiceConnection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: interaction.guildId,
        adapterCreator: interaction.guild.voiceAdapterCreator,
    });
    


    await interaction.reply({ 
        content: "Le channel a bien été rejoint", 
        ephemeral: true
});


}