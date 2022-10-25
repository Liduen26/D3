module.exports = async (client,interaction)=>{
    //Recup le nom du channel
    const channel = interaction.options.get("channel")
    //Recup l'id du server
    const guild = "1027139435680235550"
    console.log(interaction);
 
    //crée le channel
    member.guild.channels.create({ name: {channel}})

	await interaction.reply({ 
        content: "Le channel a bien été ajouter", 
        ephemeral: true
});
}