module.exports = async (client,interaction)=>{
    //Trouver l'utilisateur
    const member = interaction.options.getMember("utilisateur")
    //retirer le rôle a l'utilisateur
    member.roles.remove('1032221518249332746')
    //message de confirmation
	await interaction.reply({ 
        content: "Le bracelet a bien été retiré", 
        ephemeral: true
});
}