module.exports = async (client,interaction)=>{
    //Recup l'id du channel
    const channel = interaction.options.getChannel("channel")
    const idchannel = channel.id
    //Supprime le channel
    channel.delete(idchannel)
	await interaction.reply({ 
        content: "Le channel a bien été Supprimer", 
        ephemeral: true
});
}
