module.exports = async (client,interaction)=>{
    //Recup l'id du channel
    
    //Rejoindre le channel
    joinVoiceChannel({
        channelId: ''
        guildId: interaction.guildId,
        adapterCreator: interaction.guild.voiceAdapterCreator
    });

	await interaction.reply({ 
        content: "Le channel a bien été rejoint", 
        ephemeral: true
});
}