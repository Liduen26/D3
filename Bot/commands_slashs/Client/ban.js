module.exports = async (client,interaction)=>{
    //Trouver l'utilisateur
    const member = interaction.options.getMember("utilisateur")
    //bannir l'utilisateur
    member.ban()
	await interaction.reply({ 
        content: "L'utilisateur a bien été banni", 
        ephemeral: true
});
}