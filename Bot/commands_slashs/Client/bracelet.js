module.exports = async (client,interaction)=>{
	//Trouver le rôle 
    let role = interaction.member.guild.roles.cache.get('1032221518249332746')
    //Trouver l'utilisateur
    const member = interaction.options.getMember("utilisateur")
    //ajouter le rôle a l'utilisateur
    member.roles.add(role)
	await interaction.reply({ 
        content: "Le bracelet a bien été posé", 
        ephemeral: true
});
}